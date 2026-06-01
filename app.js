// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Hero micro animations
const motionQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReducedMotion = Boolean(motionQuery && motionQuery.matches);
const gsapInstance = window.gsap;

if (!prefersReducedMotion && gsapInstance) {
  const heroItems = [
    document.querySelector('.hero-badge'),
    document.querySelector('.hero-title'),
    document.querySelector('.hero-subtitle'),
    document.querySelector('.hero-desc'),
    document.querySelector('.hero-actions'),
    document.querySelector('.hero-visual')
  ].filter(Boolean);

  gsapInstance.from(heroItems, {
    autoAlpha: 0,
    y: 18,
    duration: 0.75,
    stagger: 0.1,
    ease: 'power3.out'
  });

  const dashboardCard = document.querySelector('.dashboard-card');

  if (dashboardCard) {
    gsapInstance.to(dashboardCard, {
      y: -8,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    });
  }
}

// Scroll reveal animation
const scrollRevealTargets = document.querySelectorAll(
  '.service-card, .portfolio-card, .process-step, .contact-box'
);

if (!prefersReducedMotion && typeof IntersectionObserver !== 'undefined') {
  if (gsapInstance) {
    gsapInstance.set(scrollRevealTargets, { autoAlpha: 0, y: 20 });

    const gsapRevealObserver = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);

      if (!visibleEntries.length) {
        return;
      }

      const visibleTargets = visibleEntries.map(entry => {
        gsapRevealObserver.unobserve(entry.target);
        return entry.target;
      });

      gsapInstance.fromTo(
        visibleTargets,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'opacity,visibility,transform'
        }
      );
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    scrollRevealTargets.forEach(el => {
      gsapRevealObserver.observe(el);
    });
  } else {
    const fallbackRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fallbackRevealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    scrollRevealTargets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      fallbackRevealObserver.observe(el);
    });
  }
}

// Internal search system demo
const internalSearchDemo = document.querySelector('[data-demo="internal-search"]');

if (internalSearchDemo) {
  const demoItems = [
    {
      name: '資料整理方案',
      category: '資料整理',
      audience: '行政與營運團隊',
      tags: ['欄位標準化', '去重', '格式整理'],
      delivery: '整理腳本 + CSV',
      difficulty: '簡單',
      timeline: '2-4 天',
      description: '將來源不同、欄位名稱不一致的資料整理成統一格式，方便後續查詢、比對與匯入。',
      result: '降低人工複製貼上的時間，讓資料輸出更穩定。'
    },
    {
      name: 'PDF 擷取方案',
      category: '文件擷取',
      audience: '文件處理人員',
      tags: ['PDF', '欄位擷取', '批次處理'],
      delivery: '擷取腳本 + 表格檔',
      difficulty: '中等',
      timeline: '4-7 天',
      description: '依照文件版型擷取指定欄位，將多份 PDF 的內容轉成可整理與篩選的表格資料。',
      result: '減少逐頁開啟文件與手動複製欄位的工作量。'
    },
    {
      name: '報表自動化方案',
      category: '流程自動化',
      audience: '每月需整理報表的團隊',
      tags: ['月報', '資料合併', '輸出檔案'],
      delivery: '自動化腳本 + 操作說明',
      difficulty: '中等',
      timeline: '5-8 天',
      description: '將固定週期的報表整理流程拆解成可重複執行的步驟，自動完成合併、清理與輸出。',
      result: '讓每月報表產出更快，也降低漏步驟與格式錯誤。'
    },
    {
      name: '內部查詢工具方案',
      category: '內部工具',
      audience: '需要快速查找資料的成員',
      tags: ['搜尋', '篩選', '資料庫雛形'],
      delivery: '查詢頁面 + 示範資料',
      difficulty: '進階',
      timeline: '7-12 天',
      description: '把分散在試算表或文件中的常用資料整理成一個可搜尋、可篩選的內部查詢頁面。',
      result: '讓團隊成員不用反覆找檔案，也能快速定位需要的資訊。'
    },
    {
      name: '名單清洗方案',
      category: '資料整理',
      audience: '需要整理聯絡名冊的團隊',
      tags: ['重複資料', '欄位比對', '資料清洗'],
      delivery: '清洗規則 + 輸出表格',
      difficulty: '簡單',
      timeline: '2-5 天',
      description: '依照指定規則找出重複、空白、格式不一致的資料列，並整理成較容易維護的表格。',
      result: '提升名單品質，減少後續查找與比對成本。'
    },
    {
      name: '每月報表整併方案',
      category: '資料整理',
      audience: '固定彙整多份表格的使用者',
      tags: ['Excel', 'CSV', '多檔合併'],
      delivery: '整併腳本 + 範例輸出',
      difficulty: '中等',
      timeline: '3-6 天',
      description: '將多個來源檔案依照欄位規則合併，處理格式差異並輸出一份乾淨總表。',
      result: '減少重複開檔、貼上與人工核對時間。'
    },
    {
      name: '文件欄位擷取方案',
      category: '文件擷取',
      audience: '需要整理固定格式文件的團隊',
      tags: ['文件整理', '關鍵欄位', '表格輸出'],
      delivery: '擷取流程 + CSV',
      difficulty: '中等',
      timeline: '4-8 天',
      description: '針對固定格式文件建立欄位擷取流程，把標題、日期、項目與備註等資訊整理成表格。',
      result: '讓原本分散在文件內的資訊變成可查詢資料。'
    },
    {
      name: '團隊作業流程自動化方案',
      category: '流程自動化',
      audience: '重複處理固定流程的團隊',
      tags: ['流程拆解', '一鍵執行', '操作紀錄'],
      delivery: '流程腳本 + 簡易介面',
      difficulty: '進階',
      timeline: '8-14 天',
      description: '將多步驟的手動作業整理成清楚流程，視需求建立一鍵執行腳本或簡易操作介面。',
      result: '讓固定流程更一致，降低交接成本與人為疏漏。'
    }
  ];

  const searchInput = document.querySelector('#demo-search');
  const difficultySelect = document.querySelector('#demo-difficulty');
  const categoryButtons = document.querySelectorAll('[data-demo-category]');
  const clearButton = document.querySelector('#demo-clear');
  const resultsContainer = document.querySelector('#demo-results');
  const resultCount = document.querySelector('#demo-result-count');
  const emptyState = document.querySelector('#demo-empty');

  let activeCategory = '全部';

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const renderDemoItems = (items) => {
    if (!resultsContainer || !resultCount || !emptyState) {
      return;
    }

    resultCount.textContent = String(items.length);
    emptyState.hidden = items.length > 0;

    resultsContainer.innerHTML = items.map(item => `
      <article class="demo-result-card">
        <div class="demo-card-top">
          <h3>${escapeHtml(item.name)}</h3>
          <span class="demo-category">${escapeHtml(item.category)}</span>
        </div>
        <p class="demo-card-desc">${escapeHtml(item.description)}</p>
        <div class="demo-card-meta">
          <span><small>適用對象</small>${escapeHtml(item.audience)}</span>
          <span><small>交付形式</small>${escapeHtml(item.delivery)}</span>
          <span><small>難度 / 工期</small>${escapeHtml(item.difficulty)} · ${escapeHtml(item.timeline)}</span>
        </div>
        <div class="demo-card-tags">
          ${item.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
        <p class="demo-card-result">${escapeHtml(item.result)}</p>
      </article>
    `).join('');
  };

  const filterDemoItems = () => {
    const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedDifficulty = difficultySelect ? difficultySelect.value : '全部';

    const filteredItems = demoItems.filter(item => {
      const matchesCategory = activeCategory === '全部' || item.category === activeCategory;
      const matchesDifficulty = selectedDifficulty === '全部' || item.difficulty === selectedDifficulty;
      const searchableText = [
        item.name,
        item.description,
        item.result,
        ...item.tags
      ].join(' ').toLowerCase();
      const matchesKeyword = !keyword || searchableText.includes(keyword);

      return matchesCategory && matchesDifficulty && matchesKeyword;
    });

    renderDemoItems(filteredItems);
  };

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.demoCategory || '全部';
      categoryButtons.forEach(item => {
        item.classList.toggle('is-active', item === button);
      });
      filterDemoItems();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterDemoItems);
  }

  if (difficultySelect) {
    difficultySelect.addEventListener('change', filterDemoItems);
  }

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      activeCategory = '全部';

      if (searchInput) {
        searchInput.value = '';
      }

      if (difficultySelect) {
        difficultySelect.value = '全部';
      }

      categoryButtons.forEach(button => {
        button.classList.toggle('is-active', button.dataset.demoCategory === '全部');
      });

      filterDemoItems();
    });
  }

  renderDemoItems(demoItems);
}

// Excel / CSV cleaner demo
const excelCsvCleanerDemo = document.querySelector('[data-demo="excel-csv-cleaner"]');

if (excelCsvCleanerDemo) {
  const cleanerButtons = document.querySelectorAll('[data-cleaner-view]');
  const cleanerPanels = document.querySelectorAll('[data-cleaner-panel]');

  const setCleanerView = (viewName) => {
    cleanerButtons.forEach(button => {
      const isActive = button.dataset.cleanerView === viewName;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });

    cleanerPanels.forEach(panel => {
      const isActive = panel.dataset.cleanerPanel === viewName;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  };

  cleanerButtons.forEach(button => {
    button.addEventListener('click', () => {
      setCleanerView(button.dataset.cleanerView || 'before');
    });
  });
}
