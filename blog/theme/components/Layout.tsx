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

// 目录里的跳转统一走这里。不能再用浏览器默认锚点行为：hash 没变化时（比如点了小节、
// 往下翻一段、再点回同一个小节）浏览器不会重新滚动，看起来就是「点了没反应」。
// 点目录跳到某个标题时，让正文里那个标题自己也闪一下（1.5s 后褪掉）。
// 长文里跳过去只看到一片正文，不给点提示经常找不到落点是哪个标题。
let headingFlashTimer: number | undefined;
let flashedHeading: HTMLElement | null = null;

function flashHeading(heading: HTMLElement) {
  if (headingFlashTimer) window.clearTimeout(headingFlashTimer);
  if (flashedHeading && flashedHeading !== heading) {
    flashedHeading.classList.remove("rp-heading-flash");
  }
  // 同一个标题反复点也要能重新播一遍：先摘掉类、强制一次重排，再加回去
  heading.classList.remove("rp-heading-flash");
  void heading.offsetWidth;
  heading.classList.add("rp-heading-flash");
  flashedHeading = heading;
  headingFlashTimer = window.setTimeout(() => {
    heading.classList.remove("rp-heading-flash");
    if (flashedHeading === heading) flashedHeading = null;
    headingFlashTimer = undefined;
  }, 1600);
}

function scrollToHeading(href: string, scrollPaddingTop: number) {
  let target: HTMLElement | null = null;
  try {
    target = document.getElementById(decodeURIComponent(href.slice(1)));
  } catch {
    target = document.getElementById(href.slice(1));
  }
  if (!target) return;
  // 用即时跳转（behavior: "auto"）。长文档里浏览器自带的平滑滚动会拖 1 秒以上，
  // 点一下目录要「飞」过整篇正文，看着像卡住；想改成动画把这里换回 "smooth" 即可。
  window.scrollTo({
    top: getTargetTop(target, scrollPaddingTop),
    behavior: "auto",
  });
  flashHeading(target);
  // 地址栏跟着走，但不写 location.hash —— 那样又会触发一次浏览器默认跳转。
  // location.hash 是编码过的，比较前先解码，避免每次点击都往历史里塞一条。
  let current = window.location.hash;
  try {
    current = decodeURIComponent(current);
  } catch {
    // 保持原样
  }
  if (current !== href) window.history.pushState(null, "", href);
}

// 窄屏那份目录是顶栏里的下拉框，选完要收起来
function closeLocalToc() {
  const menu = document.querySelector<HTMLElement>(".rspress-sidebar-menu");
  const toggle = menu
    ? Array.from(menu.children)
        .filter((el) => el.tagName === "BUTTON")
        .pop()
    : null;
  if (toggle instanceof HTMLElement) toggle.click();
}

// 从实时 DOM 计算当前应高亮的目录项
function applyAsideHighlight(scrollPaddingTop: number) {
  const anchors = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".rspress-doc .header-anchor"),
  );
  if (!anchors.length) return;

  // 正文里有些标题不在目录里（Rspress 的目录只到 h4，这篇里就有几个 h5）。
  // 判定「当前小节」必须把它们排除，否则会算到目录里根本不存在的条目上：
  // 高亮被清空（看着像消失），右侧目录也失去目标不再跟着滚，
  // 得等滚过这一段重新对上一条目录才会「自己跳到位」。
  const tocHrefs = new Set(
    Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        "#aside-container a, .rspress-local-toc-container a",
      ),
    ).map((item) => item.getAttribute("href")),
  );
  const links = anchors.filter((item) => tocHrefs.has(item.getAttribute("href")));
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

  const href = links[activeIndex].getAttribute("href");
  if (!href) return;

  // 目录里找对应条目：直接比 href，不用 `a[href="#..."]` 拼选择器 ——
  // 标题 id 里出现引号之类字符时选择器会抛错，那一段的高亮就会整体消失
  const findLink = (root: HTMLElement | null) =>
    root
      ? Array.from(root.querySelectorAll<HTMLElement>("a")).find(
          (item) => item.getAttribute("href") === href,
        )
      : undefined;

  // 桌面端：右侧目录。主题自己的 useBindingAsideScroll 也会往链接上加 .aside-active，
  // 它按「不含一级标题」的锚点算，和这里会差一项，两边各标一个就出现双高亮。
  // 所以高亮统一用自定义的 .toc-active，主题那个类在 global.css 里已被取消样式。
  const aside = document.getElementById("aside-container");
  aside
    ?.querySelectorAll(".aside-active, .toc-active")
    .forEach((el) => el.classList.remove("aside-active", "toc-active"));
  const asideTarget = findLink(aside);
  asideTarget?.classList.add("toc-active");
  // 当前小节快到目录可视区边缘时，让目录自己滚到合适位置（类似飞书文档右侧目录）
  const asideScroller = getAsideScrollContainer();
  if (asideScroller && asideTarget) keepActiveVisible(asideScroller, asideTarget);

  // 窄屏：顶栏里的下拉目录主题不做高亮，这里单独标 toc-active（样式在 global.css）
  const localToc = document.querySelector<HTMLElement>(".rspress-local-toc-container");
  localToc?.querySelectorAll(".toc-active").forEach((el) => el.classList.remove("toc-active"));
  findLink(localToc)?.classList.add("toc-active");
}

// 右侧目录的可滚动容器（桌面端那个 sticky 盒子），窄屏下它是 display:none
function getAsideScrollContainer(): HTMLElement | null {
  let container = document.getElementById("aside-container")?.parentElement ?? null;
  while (container && container !== document.body) {
    const overflowY = window.getComputedStyle(container).overflowY;
    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
      return container;
    }
    container = container.parentElement;
  }
  return null;
}

// 当前小节被挤到目录可视区边缘（或已经在外面）时，把它挪到靠上的位置，
// 留出后面的条目 —— 不做处理的话目录会一直停在顶部不动
function keepActiveVisible(container: HTMLElement, active: HTMLElement) {
  const containerRect = container.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  const margin = activeRect.height; // 上下各留一行的余量
  const withinView =
    activeRect.top >= containerRect.top + margin &&
    activeRect.bottom <= containerRect.bottom - margin;
  if (withinView) return;
  const maxScrollTop = container.scrollHeight - container.clientHeight;
  const target = container.scrollTop + (activeRect.top - containerRect.top - containerRect.height * 0.35);
  container.scrollTo({
    top: Math.max(0, Math.min(target, maxScrollTop)),
    behavior: "smooth",
  });
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
    // 点击行为交给 window 上那个统一的目录点击处理（scrollToHeading），
    // 这里不再单独挂事件，免得同一篇文章的目录出现两套跳转逻辑
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
  const container = getAsideScrollContainer();
  if (!container) return;
  const next = container.scrollHeight > container.clientHeight + 1 ? "contain" : "";
  if (container.style.overscrollBehaviorY !== next) {
    container.style.overscrollBehaviorY = next;
  }
}

// 主题在 <=960px 会换成「logo + 搜索图标 + 汉堡」那条窄屏导航，
// global.css 把这一条整条隐藏，把搜索和暗黑切换补到下面「Menu / 目录」这一条的右侧。
// 直接搬主题的节点会打乱 React 对 DOM 的接管，所以这里复制外观、点击时转发给原始按钮，
// 主题自己的搜索弹窗和主题切换逻辑照常走。
const NARROW_MEDIA = "(max-width: 960px)";

const SEARCH_CONTROL_SELECTORS = [
  '.rspress-nav [class*="mobileNavMenu"] [class*="mobileNavSearchButton"]',
  '.rspress-nav [class*="mobileNavSearchButton"]',
  ".rspress-nav .rspress-nav-search-button",
];

const APPEARANCE_CONTROL_SELECTORS = [".rspress-nav .rspress-nav-appearance"];

function findLiveControl(selectors: string[]): HTMLElement | null {
  for (const selector of selectors) {
    const el = document.querySelector<HTMLElement>(selector);
    if (el) return el;
  }
  return null;
}

function ensureMobileNavActions() {
  const menu = document.querySelector<HTMLElement>(".rspress-sidebar-menu");
  if (!menu) return;
  const existing = menu.querySelector<HTMLElement>("[data-rp-mobile-actions]");
  // 放大回桌面宽度后把注入的按钮收掉，避免和左侧导航重复
  if (!window.matchMedia(NARROW_MEDIA).matches) {
    existing?.remove();
    return;
  }
  if (existing) return;
  // 这一条本来就没有按钮（既没有左侧菜单也没有目录）时不注入，免得凭空多出一条
  if (!menu.querySelector(":scope > button")) return;

  const searchSource = findLiveControl(SEARCH_CONTROL_SELECTORS);
  const appearanceSource = findLiveControl(APPEARANCE_CONTROL_SELECTORS);
  if (!searchSource || !appearanceSource) return;

  const actions = document.createElement("div");
  actions.dataset.rpMobileActions = "true";
  actions.className = "rp-mobile-nav-actions";

  // 两个按钮统一成同一种「28px 描边小方块 + 18px 图标」，
  // 只把主题自己的 <svg> 复制过来（暗黑那对 svg 带 dark:hidden / hidden dark:block，会自动换图标）
  const toIconButton = (source: HTMLElement, label: string, targets: string[]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "rp-mobile-nav-icon";
    button.setAttribute("aria-label", label);
    button.title = label;
    source.querySelectorAll("svg").forEach((svg) => {
      button.appendChild(svg.cloneNode(true));
    });
    button.addEventListener("click", () => findLiveControl(targets)?.click());
    return button;
  };

  actions.append(
    toIconButton(searchSource, "搜索", SEARCH_CONTROL_SELECTORS),
    toIconButton(appearanceSource, "切换主题", APPEARANCE_CONTROL_SELECTORS),
  );

  // 插到「目录」按钮前面，这样右侧的排布是 [搜索][暗黑切换][目录]
  const tocButton = menu.querySelector<HTMLElement>(":scope > button.ml-auto");
  if (tocButton) menu.insertBefore(actions, tocButton);
  else menu.appendChild(actions);
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
    // <=960px 时第一条导航被 global.css 整条隐藏，只统计下面那条 46px 菜单栏
    const navbarHeight = hiddenNav || width <= 960 ? 0 : 72;
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

    // 右侧目录和窄屏下拉目录里的条目，点击统一自己接管：
    // 浏览器默认的锚点跳转在 hash 不变时不会动，点了同一个标题第二遍就没反应
    const onTocClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as HTMLElement | null)?.closest?.("a");
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      if (!TOC_ROOTS.some(({ selector }) => link.closest(selector))) return;

      event.preventDefault();
      scrollToHeading(href, scrollPaddingTop);
      // 窄屏那个下拉目录选完收起来（主题渲染的条目自己有 onClick，注入的没有）
      const localToc = link.closest(".rspress-local-toc-container");
      if (localToc?.classList.contains("rspress-local-toc-container-show")) {
        closeLocalToc();
      }
    };
    window.addEventListener("click", onTocClick);

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
      ensureMobileNavActions();
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
      window.removeEventListener("click", onTocClick);
      window.clearInterval(timer);
    };
    // 修复：theme-default 的 useBindingAsideScroll 依赖 headers.length，
    // 通过左侧侧边栏切换文章时，若前后文章标题数量相同，effect 不会重建，
    // 滚动监听仍引用旧页面已卸载的 DOM，导致右侧目录高亮失效。
    // 这里始终从实时 DOM 查询锚点，并在文章内容变化时重新应用高亮。
  }, [scrollPaddingTop]);

  return <BasicLayout {...props} />;
}
