const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const authWrapper = document.querySelector(".auth-wrapper");
const kycSection = document.getElementById("kyc-section");
const kycForm = document.getElementById("kyc-form");
const kycUserEmail = document.getElementById("kyc-user-email");
const dashboard = document.getElementById("dashboard");
const dashUserEmail = document.getElementById("dash-user-email");
const startInvestingBtn = document.getElementById("start-investing-btn");
const investFlow = document.getElementById("invest-flow");
const investTypeRow = document.getElementById("invest-type-row");
const budgetStep = document.getElementById("budget-step");
const budgetRow = document.getElementById("budget-row");
const recommendStep = document.getElementById("recommend-step");
const recommendSubtitle = document.getElementById("recommend-subtitle");
const recommendList = document.getElementById("recommend-list");
const lendExploreBtn = document.getElementById("lend-explore-btn");
const lendFlow = document.getElementById("lend-flow");
const lendAmountInput = document.getElementById("lend-amount");

let selectedInvestType = null;
let selectedBudget = null;

function showLogin() {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
}

function showSignup() {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
}

function showKyc(email) {
  if (authWrapper) {
    authWrapper.style.display = "none";
  }
  if (kycSection) {
    kycSection.classList.remove("hidden");
  }
  if (kycUserEmail && email) {
    kycUserEmail.textContent = email;
  }
  if (dashUserEmail && email) {
    dashUserEmail.textContent = email;
  }
}

// ------- Lending details page rendering -------
const lendAmountDisplayEl = document.getElementById("lend-amount-display");
const lendConfirmBtn = document.getElementById("lend-confirm-btn");
const lendConfirmBox = document.getElementById("lend-confirm-box");

if (lendAmountDisplayEl) {
  try {
    const raw = localStorage.getItem("lendAmount");
    if (raw && raw.trim() !== "") {
      const num = Number(raw);
      if (!Number.isNaN(num) && num > 0) {
        lendAmountDisplayEl.textContent = "₹" + num.toLocaleString("en-IN");
      } else {
        lendAmountDisplayEl.textContent = raw;
      }
    } else {
      lendAmountDisplayEl.textContent = "Not specified";
    }
  } catch (err) {
    console.error("Failed to read lend amount", err);
  }
}

lendConfirmBtn?.addEventListener("click", () => {
  if (!lendConfirmBox) return;
  lendConfirmBox.classList.remove("hidden");
});

loginTab?.addEventListener("click", showLogin);
signupTab?.addEventListener("click", showSignup);

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  showKyc(email);
});

signupForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const confirm = document.getElementById("signup-confirm").value.trim();

  if (!name || !email || !password || !confirm) {
    alert("Please fill out all fields.");
    return;
  }

  if (password.length < 6) {
    alert("Password should be at least 6 characters.");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match.");
    return;
  }
  showKyc(email);
});

kycForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.getElementById("kyc-full-name").value.trim();
  const dob = document.getElementById("kyc-dob").value;
  const address = document.getElementById("kyc-address").value.trim();
  const idNumber = document.getElementById("kyc-id-number").value.trim();

  if (!fullName || !dob || !address || !idNumber) {
    alert("Please fill in all KYC details.");
    return;
  }
  if (kycSection) {
    kycSection.classList.add("hidden");
  }
  if (dashboard) {
    dashboard.classList.remove("hidden");
  }
});

function updateRecommendations() {
  if (!selectedInvestType || !selectedBudget || !recommendList || !recommendSubtitle) {
    return;
  }

  /**
   * NOTE: These are sample, static suggestions – not real-time market analysis.
   * You can later replace this with live data from an API.
   */
  let ideas = [];

  if (selectedInvestType === "stocks") {
    if (selectedBudget === "0-10k") {
      ideas = [
        {
          name: "Nifty 50 Index ETF",
          why: "Low-cost diversified exposure to top 50 Indian companies; good for beginners.",
          accuracy: 82,
          marketCap: "Large-cap basket (index of top 50 stocks)",
          analysis:
            "Broad-based exposure reduces single-stock risk; historically tracks overall market performance.",
        },
        {
          name: "Reliance Industries Ltd.",
          why: "Market leader in energy, retail and telecom with consistent earnings visibility.",
          accuracy: 78,
          marketCap: "₹18+ lakh crore (approx, large cap)",
          analysis:
            "Diversified business segments with strong cash flows; benefits from both domestic consumption and infrastructure spending.",
        },
      ];
    } else if (selectedBudget === "10k-100k") {
      ideas = [
        {
          name: "HDFC Bank Ltd.",
          why: "Large private bank with stable asset quality and strong retail franchise.",
          accuracy: 80,
          marketCap: "₹10+ lakh crore (approx, large cap)",
          analysis:
            "Steady loan growth and conservative risk management; historically resilient across cycles.",
        },
        {
          name: "Infosys Ltd.",
          why: "Top-tier IT services company benefiting from global digital transformation.",
          accuracy: 79,
          marketCap: "₹6+ lakh crore (approx, large cap)",
          analysis:
            "High-quality client base, strong cash generation, and focus on digital and cloud services.",
        },
      ];
    } else if (selectedBudget === "100k-10L") {
      ideas = [
        {
          name: "Diversified Large & Mid Cap Basket",
          why: "Blend of stable blue-chips and growth-oriented mid caps for long-term compounding.",
          accuracy: 84,
          marketCap: "Mix of large and mid cap holdings",
          analysis:
            "Aims to balance downside protection from large caps with upside potential from quality mid caps.",
        },
        {
          name: "International Equity ETF (US 500)",
          why: "Adds global diversification across leading US companies.",
          accuracy: 76,
          marketCap: "Tracks top 500 US companies by market cap",
          analysis:
            "Provides currency diversification and access to global leaders in tech, healthcare, and consumer brands.",
        },
      ];
    } else {
      ideas = [
        {
          name: "Custom PMS-style Basket",
          why: "Concentrated portfolio across high-conviction sectors with active rebalancing.",
          accuracy: 81,
          marketCap: "Blend of multi-cap holdings (customized)",
          analysis:
            "Higher-risk, higher-return approach that relies on strong research and disciplined risk controls.",
        },
        {
          name: "Factor / Smart-Beta Strategy",
          why: "Rules-based portfolio using factors like quality and low volatility.",
          accuracy: 77,
          marketCap: "Multi-cap factor-based basket",
          analysis:
            "Seeks to outperform traditional index investing by tilting towards academic factor premiums.",
        },
      ];
    }
  } else if (selectedInvestType === "mutual_funds") {
    ideas = [
      {
        name: "Balanced Hybrid Fund",
        why: "Mix of equity and debt for smoother returns and lower drawdowns.",
        accuracy: 80,
        marketCap: "Multi-asset (equity + debt) mutual fund",
        analysis:
          "Designed for moderate risk profiles seeking a balance between growth and capital protection.",
      },
      {
        name: "Flexi Cap Equity Fund",
        why: "Dynamic allocation across large, mid and small caps based on opportunities.",
        accuracy: 78,
        marketCap: "Dynamic market-cap allocation across segments",
        analysis:
          "Lets the fund manager shift between segments based on valuations and earnings outlook.",
      },
    ];
  } else if (selectedInvestType === "gold") {
    ideas = [
      {
        name: "Gold ETF",
        why: "Convenient way to hold gold with transparent pricing and low storage risk.",
        accuracy: 79,
        marketCap: "Linked to domestic gold ETF AUM",
        analysis:
          "Tracks domestic gold prices; typically used as a hedge against inflation and currency risk.",
      },
      {
        name: "Sovereign Gold Bonds (SGBs)",
        why: "Backed by government with additional interest over gold price appreciation.",
        accuracy: 83,
        marketCap: "Issued by Government of India (series based)",
        analysis:
          "Offers gold price exposure plus coupon interest, suitable for long-term gold allocation.",
      },
    ];
  } else if (selectedInvestType === "bonds") {
    ideas = [
      {
        name: "Short-Duration Debt Fund",
        why: "Targets relatively stable returns with lower interest-rate sensitivity.",
        accuracy: 75,
        marketCap: "Debt mutual fund (varies by scheme)",
        analysis:
          "Invests in shorter-maturity bonds to reduce volatility from interest rate movements.",
      },
      {
        name: "AAA Corporate Bond Fund",
        why: "Focus on high-rated issuers to reduce credit risk while earning better yields than FDs.",
        accuracy: 78,
        marketCap: "Portfolio of AAA-rated corporate issuers",
        analysis:
          "Targets quality corporate debt with emphasis on safety and predictable income.",
      },
    ];
  } else if (selectedInvestType === "sip") {
    ideas = [
      {
        name: "Monthly SIP – Nifty 50 Index Fund",
        why: "Disciplined, rupee-cost averaging into the broader market index.",
        accuracy: 82,
        marketCap: "Index fund across top 50 companies",
        analysis:
          "Combines SIP discipline with index diversification, smoothing out entry points over time.",
      },
      {
        name: "Goal-based SIP Basket",
        why: "Separate SIPs for goals like education, house, and retirement with different risk levels.",
        accuracy: 80,
        marketCap: "Multiple schemes aligned to different financial goals",
        analysis:
          "Helps map each SIP to a clear timeline and risk profile, improving planning discipline.",
      },
    ];
  }

  recommendSubtitle.textContent =
    "Showing ideas for " + selectedInvestType.replace("_", " ") + " with budget " + selectedBudget;

  recommendList.innerHTML = "";
  ideas.forEach((idea, index) => {
    const li = document.createElement("li");
    li.classList.add("recommend-item");
    li.setAttribute("data-idea-index", String(index));

    const title = document.createElement("div");
    title.textContent = idea.name + "  •  " + idea.accuracy + "% match";
    title.style.fontWeight = "600";
    title.style.fontSize = "0.9rem";

    const reason = document.createElement("div");
    reason.textContent = idea.why;
    reason.style.fontSize = "0.85rem";
    reason.style.opacity = "0.9";

    li.appendChild(title);
    li.appendChild(reason);
    recommendList.appendChild(li);

    li.addEventListener("click", () => {
      try {
        const payload = {
          name: idea.name,
          why: idea.why,
          accuracy: idea.accuracy,
          marketCap: idea.marketCap,
          analysis: idea.analysis,
          type: selectedInvestType,
          budget: selectedBudget,
        };
        localStorage.setItem("selectedStockIdea", JSON.stringify(payload));
      } catch (err) {
        console.error("Failed to store selected stock idea", err);
      }
      window.location.href = "stock.html";
    });
  });
}

startInvestingBtn?.addEventListener("click", () => {
  if (!investFlow) return;
  investFlow.classList.remove("hidden");
  investFlow.scrollIntoView({ behavior: "smooth", block: "start" });
});

lendExploreBtn?.addEventListener("click", () => {
  if (!lendFlow) return;
  lendFlow.classList.remove("hidden");
  lendFlow.scrollIntoView({ behavior: "smooth", block: "start" });
});

lendAmountInput?.addEventListener("click", () => {
  try {
    const raw = lendAmountInput.value || "";
    localStorage.setItem("lendAmount", raw);
  } catch (err) {
    console.error("Failed to store lend amount", err);
  }
  window.location.href = "lending.html";
});

investTypeRow?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const type = target.getAttribute("data-type");
  if (!type) return;

  selectedInvestType = type;

  const buttons = investTypeRow.querySelectorAll(".chip-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  target.classList.add("active");

  if (budgetStep) {
    budgetStep.classList.remove("hidden");
  }
});

budgetRow?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const budget = target.getAttribute("data-budget");
  if (!budget) return;

  selectedBudget = budget;

  const buttons = budgetRow.querySelectorAll(".chip-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  target.classList.add("active");

  if (recommendStep) {
    recommendStep.classList.remove("hidden");
  }

  updateRecommendations();
});

const stockNameEl = document.getElementById("stock-detail-name");
const stockTaglineEl = document.getElementById("stock-detail-tagline");
const stockMarketCapEl = document.getElementById("stock-detail-marketcap");
const stockAccuracyEl = document.getElementById("stock-detail-accuracy");
const stockAnalysisEl = document.getElementById("stock-detail-analysis");
const stockWhyEl = document.getElementById("stock-detail-why");
const stockNoteEl = document.getElementById("stock-detail-note");
const stockAcceptBtn = document.getElementById("stock-accept-btn");

if (stockNameEl && stockMarketCapEl && stockAccuracyEl && stockAnalysisEl && stockWhyEl) {
  try {
    const raw = localStorage.getItem("selectedStockIdea");
    if (raw) {
      const data = JSON.parse(raw);
      stockNameEl.textContent = data.name || "Selected Stock";
      if (stockTaglineEl) {
        stockTaglineEl.textContent =
          (data.type ? data.type.replace("_", " ") : "") +
          (data.budget ? " • Budget: " + data.budget : "");
      }
      stockMarketCapEl.textContent = data.marketCap || "N/A";
      stockAccuracyEl.textContent = (data.accuracy || "-") + "% match";
      stockAnalysisEl.textContent = data.analysis || "No analysis available.";
      stockWhyEl.textContent = data.why || "No rationale available.";
    } else if (stockNoteEl) {
      stockNoteEl.textContent =
        "No specific stock was selected. Go back to the investing page and click a suggestion.";
    }
  } catch (err) {
    console.error("Failed to parse selected stock idea", err);
  }
}

stockAcceptBtn?.addEventListener("click", () => {
  window.location.href = "buy.html";
});

// ------- Buy page rendering -------
const buyStockNameEl = document.getElementById("buy-stock-name");
const buyBalanceTextEl = document.getElementById("buy-balance-text");
const buyForm = document.getElementById("buy-form");
const buyPriceInput = document.getElementById("buy-price");
const buySharesInput = document.getElementById("buy-shares");

function budgetToBalance(budget) {
  switch (budget) {
    case "0-10k":
      return 10000;
    case "10k-100k":
      return 100000;
    case "100k-10L":
      return 1000000;
    case "10L+":
      return 2000000;
    default:
      return 0;
  }
}

if (buyStockNameEl && buyBalanceTextEl && buyForm && buyPriceInput && buySharesInput) {
  try {
    const raw = localStorage.getItem("selectedStockIdea");
    if (raw) {
      const data = JSON.parse(raw);
      const balance = budgetToBalance(data.budget);
      buyStockNameEl.textContent = data.name || "Selected Stock";
      buyBalanceTextEl.textContent =
        "Approx. budget available: ₹" + balance.toLocaleString("en-IN");

      buyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const price = parseFloat(buyPriceInput.value || "0");
        const shares = parseInt(buySharesInput.value || "0", 10);
        if (!price || !shares || price <= 0 || shares <= 0) {
          alert("Please enter valid price and number of shares.");
          return;
        }
        const total = price * shares;
        try {
          const trade = {
            price,
            shares,
            total,
            balance,
          };
          localStorage.setItem("selectedTrade", JSON.stringify(trade));
        } catch (err) {
          console.error("Failed to store trade", err);
        }
        window.location.href = "confirm.html";
      });
    }
  } catch (err) {
    console.error("Failed to initialise buy page", err);
  }
}

// ------- Confirmation page rendering -------
const confirmStockNameEl = document.getElementById("confirm-stock-name");
const confirmTaglineEl = document.getElementById("confirm-tagline");
const confirmBalanceEl = document.getElementById("confirm-balance");
const confirmTotalEl = document.getElementById("confirm-total");
const confirmOrderDetailsEl = document.getElementById("confirm-order-details");

if (
  confirmStockNameEl &&
  confirmTaglineEl &&
  confirmBalanceEl &&
  confirmTotalEl &&
  confirmOrderDetailsEl
) {
  try {
    const ideaRaw = localStorage.getItem("selectedStockIdea");
    const tradeRaw = localStorage.getItem("selectedTrade");
    if (ideaRaw && tradeRaw) {
      const idea = JSON.parse(ideaRaw);
      const trade = JSON.parse(tradeRaw);
      confirmStockNameEl.textContent = idea.name || "Selected Stock";
      confirmTaglineEl.textContent =
        (idea.type ? idea.type.replace("_", " ") : "") +
        (idea.budget ? " • Budget: " + idea.budget : "");
      confirmBalanceEl.textContent =
        "₹" + (trade.balance || 0).toLocaleString("en-IN");
      confirmTotalEl.textContent =
        "₹" + (trade.total || 0).toLocaleString("en-IN") +
        " (" + trade.shares + " shares × ₹" + trade.price + ")";
      confirmOrderDetailsEl.textContent =
        "You are placing a demo order to buy " +
        trade.shares +
        " shares of " +
        idea.name +
        " at ₹" +
        trade.price +
        " per share.";
    }
  } catch (err) {
    console.error("Failed to initialise confirmation page", err);
  }
}
