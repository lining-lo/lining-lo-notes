import { useEffect, useMemo } from "react";
import type { ComponentProps } from "react";
import { Layout as BasicLayout, useHiddenNav } from "rspress/theme";
import { usePageData, useWindowSize } from "rspress/runtime";

type LayoutProps = ComponentProps<typeof BasicLayout>;

// 节流：与 lodash throttle 行为一致（leading + trailing）
function throttle(fn: () => void, wait: number) {
  let lastTime = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    const now = Date.now();
    const remaining = wait - (now - lastTime);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn();
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn();
      }, remaining);
    }
  };
}

function getTargetTop(element: HTMLElement, scrollPaddingTop: number) {
  const targetPadding = Number.parseInt(
    window.getComputedStyle(element).paddingTop,
    10,
  );
  return Math.round(
    window.scrollY +
      element.getBoundingClientRect().top -
      scrollPaddingTop -
      targetPadding,
  );
}

// 从实时 DOM 计算当前应高亮的目录项
function applyAsideHighlight(scrollPaddingTop: number) {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".rspress-doc .header-anchor"),
  );
  if (!links.length) return;

  const isBottom = () =>
    document.documentElement.scrollTop + window.innerHeight >=
    document.documentElement.scrollHeight;

  let activeIndex = 0;
  if (isBottom()) {
    activeIndex = links.length - 1;
  } else {
    for (let i = 0; i < links.length; i++) {
      const nextAnchor = links[i + 1];
      const scrollTop = Math.ceil(window.scrollY);
      const currentAnchorTop = getTargetTop(
        links[i].parentElement as HTMLElement,
        scrollPaddingTop,
      );
      if ((i === 0 && scrollTop < currentAnchorTop) || scrollTop === 0) {
        activeIndex = 0;
        break;
      }
      if (!nextAnchor) {
        activeIndex = i;
        break;
      }
      const nextAnchorTop = getTargetTop(
        nextAnchor.parentElement as HTMLElement,
        scrollPaddingTop,
      );
      if (scrollTop >= currentAnchorTop && scrollTop < nextAnchorTop) {
        activeIndex = i;
        break;
      }
    }
  }

  const id = links[activeIndex].getAttribute("href")?.slice(1) ?? "";
  if (!id) return;

  // 桌面端：右侧目录沿用主题自带的 .aside-active 样式
  const aside = document.getElementById("aside-container");
  aside?.querySelectorAll(".aside-active").forEach((el) => el.classList.remove("aside-active"));
  aside?.querySelector(`a[href="#${id}"]`)?.classList.add("aside-active");

  // 窄屏：顶栏里的下拉目录主题不做高亮，这里单独标 toc-active（样式在 global.css）
  const localToc = document.querySelector<HTMLElement>(".rspress-local-toc-container");
  localToc?.querySelectorAll(".toc-active").forEach((el) => el.classList.remove("toc-active"));
  localToc?.querySelector(`a[href="#${id}"]`)?.classList.add("toc-active");
}

// 目录有两处：桌面端是右侧的 #aside-container，窄屏（<1280px）主题会换成顶栏里的
// .rspress-local-toc-container 下拉目录。两边都要补一级标题、统一缩进，
// 否则手机上看到的目录和电脑上不是一套。
const TOC_ROOTS: { selector: string; linkSelector: string }[] = [
  { selector: "#aside-container", linkSelector: "nav ul a" },
  { selector: ".rspress-local-toc-container", linkSelector: "ul a" },
];

function getTocRoots(): { root: HTMLElement; linkSelector: string }[] {
  const roots: { root: HTMLElement; linkSelector: string }[] = [];
  for (const { selector, linkSelector } of TOC_ROOTS) {
    const root = document.querySelector<HTMLElement>(selector);
    if (root) roots.push({ root, linkSelector });
  }
  return roots;
}

// Rspress 默认不把一级标题放进目录，这里把正文里的 h1 补进目录，
// 并按文档顺序插到对应小节（h2 等）的前面
function cleanupH1Links() {
  // 只清理本脚本注入的一级标题链接，避免上一篇文章的残留
  document.querySelectorAll("li[data-aside-h1]").forEach((li) => li.remove());
}

// Rspress 原本目录从二级标题开始（二级缩进 0），补上一级标题后，
// 把二级及以下整体右移 12px，形成「一级 0 / 二级 12 / 三级 24」的层级缩进。
// React 重渲染会把行内 marginLeft 改回原值，所以记住原始值后每次重新算。
function normalizeTocIndent(root: HTMLElement, linkSelector: string) {
  root.querySelectorAll<HTMLAnchorElement>(linkSelector).forEach((a) => {
    if (a.closest("li[data-aside-h1]")) return; // 一级标题保持 0
    const base =
      a.dataset.tocBaseIndent ?? String(Number.parseFloat(a.style.marginLeft) || 0);
    a.dataset.tocBaseIndent = base;
    a.style.marginLeft = `${Number.parseFloat(base) + 12}px`;
  });
}

function injectH1Links(root: HTMLElement, linkSelector: string) {
  const ul = root.querySelector<HTMLAnchorElement>(linkSelector)?.closest("ul");
  if (!ul) return;
  const contentAnchors = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".rspress-doc .header-anchor"),
  );
  const h1Anchors = contentAnchors.filter(
    (item) => item.parentElement?.tagName === "H1",
  );
  if (!h1Anchors.length) return;

  // 现有目录链接：href -> 元素，用于去重和查找插入位置
  const asideMap = new Map<string, HTMLAnchorElement>();
  ul.querySelectorAll("a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href) asideMap.set(href, a);
  });

  for (const h1Anchor of h1Anchors) {
    const href = h1Anchor.getAttribute("href");
    if (!href || asideMap.has(href)) continue;

    const heading = h1Anchor.parentElement as HTMLElement;
    const text = (heading.textContent || "")
      .replace(/^\s*#\s*/, "")
      .replace(/\s*#$/, "")
      .trim();

    // 找到目录里已存在的、排在当前 h1 之后的第一个链接，插到它前面
    const anchorIndex = contentAnchors.indexOf(h1Anchor);
    let insertBefore: HTMLAnchorElement | null = null;
    for (let i = anchorIndex + 1; i < contentAnchors.length; i++) {
      const laterHref = contentAnchors[i].getAttribute("href");
      if (laterHref && asideMap.has(laterHref)) {
        // 参照节点必须是 <ul> 的直接子节点 <li>
        insertBefore =
          asideMap.get(laterHref)?.closest("li") || null;
        break;
      }
    }

    const li = document.createElement("li");
    li.setAttribute("data-aside-h1", "true");
    const a = document.createElement("a");
    a.href = href;
    a.title = text;
    // 桌面目录和窄屏下拉目录用的是两套类名，注入的条目要跟着当前容器走
    const isLocalToc = root.classList.contains("rspress-local-toc-container");
    a.className = isLocalToc
      ? "rspress-toc-link sm:text-normal text-sm"
      : "aside-link transition-all duration-300 hover:text-text-1 text-text-2 block";
    a.style.marginLeft = "0px";
    // "semibold" 不是合法的 CSS 值，会被浏览器丢掉；显式给 500 才能和主题自带条目一致
    a.style.fontWeight = "500";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = href.slice(1);
      // 窄屏目录是顶栏里的下拉框，选完要收起来（桌面端不在这个容器里，取不到就跳过）
      const menu = root.closest(".rspress-sidebar-menu");
      const toggle = menu
        ? Array.from(menu.children)
            .filter((el) => el.tagName === "BUTTON")
            .pop()
        : null;
      if (toggle instanceof HTMLElement) toggle.click();
    });
    const span = document.createElement("span");
    span.className = isLocalToc ? "rspress-toc-link-text block" : "aside-link-text block";
    span.textContent = text;
    a.appendChild(span);
    li.appendChild(a);

    if (insertBefore) ul.insertBefore(li, insertBefore);
    else ul.appendChild(li);
    asideMap.set(href, a);
  }
}

// 页面内容签名：正文锚点发生变化时说明文章已切换，需要重新应用高亮
function getAsideSignature(): string {
  const aside = document.getElementById("aside-container");
  if (!aside) return "";
  const anchors = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".rspress-doc .header-anchor"),
  );
  if (!anchors.length) return "";
  const first = anchors[0].getAttribute("href") || "";
  const last = anchors[anchors.length - 1].getAttribute("href") || "";
  return `${anchors.length}|${first}|${last}`;
}

// 目录比可视区高时，滚轮在目录里滚到头后不要继续带着正文一起滚（overscroll 链）；
// 目录本来就放得下时不接管滚动，否则右侧侧边栏会变成滚轮死区。
function syncAsideOverscroll() {
  const aside = document.getElementById("aside-container");
  let container = aside?.parentElement ?? null;
  while (container && container !== document.body) {
    const overflowY = window.getComputedStyle(container).overflowY;
    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") break;
    container = container.parentElement;
  }
  if (!container || container === document.body) return;
  const next = container.scrollHeight > container.clientHeight + 1 ? "contain" : "";
  if (container.style.overscrollBehaviorY !== next) {
    container.style.overscrollBehaviorY = next;
  }
}

let mermaidInitialized = false;

// Rspress 1.x 不内置 Mermaid：把 ```mermaid 代码块渲染成图表（客户端执行）
async function renderMermaidBlocks() {
  const doc = document.querySelector(".rspress-doc");
  if (!doc) return;
  const blocks = Array.from(
    doc.querySelectorAll<HTMLElement>("pre code.language-mermaid"),
  );
  if (!blocks.length) return;

  const mermaid = (await import("mermaid")).default;
  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose", // 允许节点标签里的 HTML（如 <p>__start__</p>）
      theme: "default",
    });
    mermaidInitialized = true;
  }

  for (const codeEl of blocks) {
    // <code> 自身也带 language-mermaid 类，必须取外层 <div class="language-mermaid">
    const wrapper = codeEl.closest<HTMLElement>("div.language-mermaid");
    if (!wrapper || wrapper.dataset.mermaidRendered === "true") continue;
    const source = codeEl.textContent || "";
    try {
      const id = "mmd-" + Math.random().toString(36).slice(2, 8);
      const { svg } = await mermaid.render(id, source);
      wrapper.dataset.mermaidRendered = "true";
      wrapper.innerHTML = svg;
    } catch (e) {
      console.warn("[mermaid] 渲染失败：", e);
      wrapper.dataset.mermaidRendered = "failed";
    }
  }
}

export function Layout(props: LayoutProps) {
  const { page } = usePageData();
  const { width } = useWindowSize();
  const hiddenNav = useHiddenNav();

  // 与 theme-default useUISwitch 中的计算保持一致
  const scrollPaddingTop = useMemo(() => {
    const navbarHeight = hiddenNav ? 0 : width <= 768 ? 56 : 72;
    const sidebarMenuHeight =
      width <= 960 || (width <= 1280 && page.toc.length > 0) ? 46 : 0;
    return navbarHeight + sidebarMenuHeight;
  }, [hiddenNav, width, page.toc.length]);

  useEffect(() => {
    // 同步右侧目录：先补一级标题链接，再应用滚动高亮
    const syncOutline = () => {
      for (const { root, linkSelector } of getTocRoots()) {
        injectH1Links(root, linkSelector);
        normalizeTocIndent(root, linkSelector);
      }
      applyAsideHighlight(scrollPaddingTop);
    };
    const onScroll = throttle(syncOutline, 100);
    window.addEventListener("scroll", onScroll);

    // 路由数据与正文渲染是异步的（先更新页面数据、后渲染文章内容），
    // 轮询检测正文锚点变化，正文真正渲染后再应用高亮。
    // 窄屏下拉目录展开时，把当前小节滚到可见位置，否则高亮在列表下面根本看不到
    let localTocOpened = false;
    const syncLocalTocVisibility = () => {
      const localToc = document.querySelector<HTMLElement>(
        ".rspress-local-toc-container",
      );
      if (!localToc) return;
      const isOpen = localToc.classList.contains("rspress-local-toc-container-show");
      if (isOpen && !localTocOpened) {
        applyAsideHighlight(scrollPaddingTop);
        const active = localToc.querySelector<HTMLElement>("a.toc-active");
        if (active) {
          const rootRect = localToc.getBoundingClientRect();
          const linkRect = active.getBoundingClientRect();
          localToc.scrollTop +=
            linkRect.top - rootRect.top - localToc.clientHeight / 2 + linkRect.height / 2;
        }
      }
      localTocOpened = isOpen;
    };
    let lastSignature = "";
    const apply = () => {
      syncAsideOverscroll();
      syncLocalTocVisibility();
      const signature = getAsideSignature();
      if (signature === lastSignature) return;
      lastSignature = signature;
      // 文章切换后，先清掉上一篇文章注入的一级标题，再按当前文章重新注入
      cleanupH1Links();
      syncOutline();
      renderMermaidBlocks();
    };
    const timer = window.setInterval(apply, 300);
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(timer);
    };
    // 修复：theme-default 的 useBindingAsideScroll 依赖 headers.length，
    // 通过左侧侧边栏切换文章时，若前后文章标题数量相同，effect 不会重建，
    // 滚动监听仍引用旧页面已卸载的 DOM，导致右侧目录高亮失效。
    // 这里始终从实时 DOM 查询锚点，并在文章内容变化时重新应用高亮。
  }, [scrollPaddingTop]);

  return <BasicLayout {...props} />;
}
