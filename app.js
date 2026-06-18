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
  const sampleCsvSource = document.querySelector('#sample-csv-source');
  const beforeTable = document.querySelector('#cleaner-before-table');
  const afterTable = document.querySelector('#cleaner-after-table');
  const rowCount = document.querySelector('#cleaner-row-count');
  const statusMessage = document.querySelector('#cleaner-status');
  const loadSampleButton = document.querySelector('#load-sample-csv');
  const copyCleanedButton = document.querySelector('#copy-cleaned-csv');
  const downloadCleanedButton = document.querySelector('#download-cleaned-csv');
  const summaryEmptyRows = document.querySelector('#summary-removed-empty-rows');
  const summaryTrimmedCells = document.querySelector('#summary-trimmed-cells');
  const summaryNormalizedHeaders = document.querySelector('#summary-normalized-headers');
  const summaryDuplicateRows = document.querySelector('#summary-duplicate-rows');

  const cleanerSampleCsv = `部門,項目,數量,狀態
業務部 , 本月名單 , 120 , 完成
業務部,本月名單,120,完成
行政部,  庫存盤點, 58,待確認
, , ,
行銷部,活動名單 , 32 , 完成`;

  let cleanedCsvOutput = '';

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

  const escapeCleanerHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const parseCsvLine = (line) => {
    const cells = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"' && inQuotes && nextChar === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    cells.push(current);
    return cells;
  };

  const parseCsv = (csvText) => {
    const lines = csvText.trim().split(/\r?\n/);
    const headers = parseCsvLine(lines[0] || '');
    const rows = lines.slice(1).map(parseCsvLine);

    return { headers, rows };
  };

  const normalizeHeader = (header, index) => {
    const trimmedHeader = header.trim();
    const knownHeaders = {
      '部門': '部門',
      '項目': '項目',
      '數量': '數量',
      '狀態': '狀態'
    };

    if (knownHeaders[trimmedHeader]) {
      return knownHeaders[trimmedHeader];
    }

    const normalized = header
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');

    return normalized || `column_${index + 1}`;
  };

  const toCsvValue = (value) => {
    const text = String(value);
    return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };

  const toCsv = (headers, rows) => [
    headers.map(toCsvValue).join(','),
    ...rows.map(row => row.map(toCsvValue).join(','))
  ].join('\n');

  const getRowIssues = (row, seenRows) => {
    const trimmedRow = row.map(cell => cell.trim());

    if (trimmedRow.every(cell => cell === '')) {
      return ['空白列'];
    }

    const issues = [];
    const rowKey = trimmedRow.join('\u001f');

    if (seenRows.has(rowKey)) {
      issues.push('重複列');
    } else {
      seenRows.add(rowKey);
    }

    if (row.some(cell => cell !== cell.trim())) {
      issues.push('前後空白');
    }

    return issues;
  };

  const renderTable = (target, headers, rows, options = {}) => {
    if (!target) {
      return;
    }

    if (!headers.length) {
      target.innerHTML = '<p class="cleaner-table-empty">No CSV data loaded.</p>';
      return;
    }

    const issueSeenRows = new Set();
    const displayHeaders = options.showIssues ? [...headers, '看得出來的問題'] : headers;
    const rowMarkup = rows.map(row => {
      const issues = options.showIssues ? getRowIssues(row, issueSeenRows) : [];
      const rowClasses = [
        issues.includes('空白列') ? 'is-empty-row' : '',
        issues.includes('重複列') ? 'is-duplicate-row' : ''
      ].filter(Boolean).join(' ');
      const visibleCells = headers.map((_, index) => {
        const value = row[index] || '';
        const cellClass = options.showIssues && value !== value.trim() ? ' class="is-trimmed-cell"' : '';

        return `<td${cellClass}>${escapeCleanerHtml(value)}</td>`;
      }).join('');
      const issueCell = options.showIssues
        ? `<td>${issues.map(issue => `<span class="issue-chip">${escapeCleanerHtml(issue)}</span>`).join('') || 'OK'}</td>`
        : '';

      return `<tr${rowClasses ? ` class="${rowClasses}"` : ''}>${visibleCells}${issueCell}</tr>`;
    }).join('');

    target.innerHTML = `
      <table class="cleaner-table">
        <thead>
          <tr>${displayHeaders.map(header => `<th>${escapeCleanerHtml(header)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rowMarkup}
        </tbody>
      </table>
    `;
  };

  const cleanCsv = (csvText) => {
    const parsed = parseCsv(csvText);
    const normalizedHeaders = parsed.headers.map(normalizeHeader);
    const normalizedHeaderCount = normalizedHeaders.length;
    const seenRows = new Set();
    const cleanedRows = [];
    let removedEmptyRows = 0;
    let trimmedCells = 0;
    let duplicateRows = 0;

    parsed.rows.forEach(row => {
      const paddedRow = normalizedHeaders.map((_, index) => row[index] || '');
      const trimmedRow = paddedRow.map(cell => {
        const trimmedCell = cell.trim();

        if (cell !== trimmedCell) {
          trimmedCells += 1;
        }

        return trimmedCell;
      });

      if (trimmedRow.every(cell => cell === '')) {
        removedEmptyRows += 1;
        return;
      }

      const rowKey = trimmedRow.join('\u001f');

      if (seenRows.has(rowKey)) {
        duplicateRows += 1;
        return;
      }

      seenRows.add(rowKey);
      cleanedRows.push(trimmedRow);
    });

    return {
      originalHeaders: parsed.headers,
      originalRows: parsed.rows,
      headers: normalizedHeaders,
      rows: cleanedRows,
      summary: {
        removedEmptyRows,
        trimmedCells,
        normalizedHeaders: normalizedHeaderCount,
        duplicateRows
      }
    };
  };

  const updateSummary = (summary, cleanedRows) => {
    if (rowCount) {
      rowCount.textContent = String(cleanedRows.length);
    }

    if (summaryEmptyRows) {
      summaryEmptyRows.textContent = String(summary.removedEmptyRows);
    }

    if (summaryTrimmedCells) {
      summaryTrimmedCells.textContent = String(summary.trimmedCells);
    }

    if (summaryNormalizedHeaders) {
      summaryNormalizedHeaders.textContent = String(summary.normalizedHeaders);
    }

    if (summaryDuplicateRows) {
      summaryDuplicateRows.textContent = String(summary.duplicateRows);
    }
  };

  const loadCleanerSample = (message = '已整理範例表格。下方可以直接比較 Before / After。') => {
    const cleaned = cleanCsv(cleanerSampleCsv);
    cleanedCsvOutput = toCsv(cleaned.headers, cleaned.rows);

    if (sampleCsvSource) {
      sampleCsvSource.textContent = cleanerSampleCsv;
    }

    renderTable(beforeTable, cleaned.originalHeaders, cleaned.originalRows, { showIssues: true });
    renderTable(afterTable, cleaned.headers, cleaned.rows);
    updateSummary(cleaned.summary, cleaned.rows);

    if (statusMessage) {
      statusMessage.textContent = message;
    }
  };

  const copyCleanedCsv = async () => {
    if (!cleanedCsvOutput) {
      loadCleanerSample('已先載入範例 CSV，再複製清理後結果。');
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(cleanedCsvOutput);
      } else {
        const fallbackTextarea = document.createElement('textarea');
        fallbackTextarea.value = cleanedCsvOutput;
        fallbackTextarea.setAttribute('readonly', '');
        fallbackTextarea.style.position = 'fixed';
        fallbackTextarea.style.left = '-9999px';
        document.body.appendChild(fallbackTextarea);
        fallbackTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(fallbackTextarea);
      }

      if (statusMessage) {
        statusMessage.textContent = '已複製整理後 CSV，貼到報告前仍請人工確認。';
      }
    } catch (error) {
      if (statusMessage) {
        statusMessage.textContent = '無法自動複製，請直接選取整理後表格或下載 CSV。';
      }
    }
  };

  const downloadCleanedCsv = () => {
    if (!cleanedCsvOutput) {
      loadCleanerSample('已先載入範例 CSV，再建立下載檔。');
    }

    const blob = new Blob([cleanedCsvOutput], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cleaned-report-table-sample.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (statusMessage) {
      statusMessage.textContent = '已下載整理後範例 CSV。這不是正式資料處理輸出。';
    }
  };

  cleanerButtons.forEach(button => {
    button.addEventListener('click', () => {
      setCleanerView(button.dataset.cleanerView || 'before');
    });
  });

  if (loadSampleButton) {
    loadSampleButton.addEventListener('click', () => {
      loadCleanerSample();
    });
  }

  if (copyCleanedButton) {
    copyCleanedButton.addEventListener('click', copyCleanedCsv);
  }

  if (downloadCleanedButton) {
    downloadCleanedButton.addEventListener('click', downloadCleanedCsv);
  }

  loadCleanerSample('範例表格已整理：空白列移除，重複列排除，前後空白已修掉。');
}

// PDF extractor demo
const pdfExtractorDemo = document.querySelector('[data-demo="pdf-extractor"]');

if (pdfExtractorDemo) {
  const pdfButtons = document.querySelectorAll('[data-pdf-view]');
  const pdfPanels = document.querySelectorAll('[data-pdf-panel]');

  const setPdfView = (viewName) => {
    pdfButtons.forEach(button => {
      const isActive = button.dataset.pdfView === viewName;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });

    pdfPanels.forEach(panel => {
      const isActive = panel.dataset.pdfPanel === viewName;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  };

  pdfButtons.forEach(button => {
    button.addEventListener('click', () => {
      setPdfView(button.dataset.pdfView || 'preview');
    });
  });
}
