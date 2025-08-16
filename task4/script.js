  const cardsData = [
    { title: "The Future of AI in 2025", img: "./img/card1.jpeg",category: "Tech" , desc: "An in-depth look at AI.", date: "14 Aug 2025" },
    { title: "Top 10 Destinations", img: "./img/card2.jpeg",category: "Travel", desc: "Best travel spots.", date: "10 Aug 2025" },
    { title: "5 Easy Pasta Recipes", img: "./img/card3.jpeg",category: "Food" , desc: "Quick and delicious.", date: "8 Aug 2025" },
    { title: "How 5G is Changing Communication", img: "./img/card4.jpeg",category: "Tech" ,desc: "Impact of 5G.", date: "4 Aug 2025" },
    { title: "A Foodie's Guide to Paris", img: "./img/card2.jpeg",category: "Food" , desc: "Best food in Paris.", date: "1 Aug 2025" },
    { title: "Building Your First Website", img: "./img/card1.jpeg",category: "Tech" , desc: "Step-by-step guide.", date: "28 Jul 2025" },
    { title: "Exploring the Swiss Alps", img: "./img/card4.jpeg",category: "Travel", desc: "Travel diary in Alps.", date: "20 Jul 2025" },
    { title: "The Rise of Electric Vehicles", img: "./img/card1.jpeg",category: "Tech" , desc: "Future of EVs.", date: "15 Jul 2025" }
  ];

  const cardsContainer = document.getElementById('cards-container');
  const pagination = document.getElementById('pagination');
  const pageInfo = document.getElementById('page-info');
  const searchInput = document.getElementById('searchInput');
  const categoryButtons = document.querySelectorAll("nav button");

  let perPage = 4;
  let currentPage = 1;
  let filteredData = [...cardsData]; 
  let currentCategory = "All"; // الفئة الحالية

  function cardTemplate(card){
    return `
      <article class="border rounded-md p-4 shadow bg-white">
        <img src="${card.img}" class="w-full h-48 object-cover rounded mb-4">
        <h2 class="text-xl font-semibold mb-2">${card.title}</h2>
        <p class="text-gray-700 mb-2">${card.desc}</p>
        <p class="text-sm text-gray-500">${card.date}</p>
      </article>
    `;
  }

  function renderCards(page){
    const totalPages = Math.ceil(filteredData.length / perPage);
    const start = (page - 1) * perPage;
    const slice = filteredData.slice(start, start + perPage);
    cardsContainer.innerHTML = slice.map(cardTemplate).join('');
    pageInfo.textContent = `Showing ${start+1}-${Math.min(start+perPage, filteredData.length)} of ${filteredData.length}`;
    renderPagination(totalPages);
  }

  function renderPagination(totalPages){
    pagination.innerHTML = '';
    for(let i=1; i<=totalPages; i++){
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = `px-3 py-1 border rounded ${i===currentPage ? 'bg-indigo-500 text-white' : 'bg-white'}`;
      btn.onclick = () => { currentPage = i; renderCards(currentPage); };
      pagination.appendChild(btn);
    }
  }

  function searchCards(){
    const query = searchInput.value.toLowerCase();
    filteredData = cardsData.filter(card =>
      (currentCategory === "All" || card.category === currentCategory ) &&
      (card.title.toLowerCase().includes(query) || card.desc.toLowerCase().includes(query))
    );
    currentPage = 1;
    renderCards(currentPage);
  }

  // التعامل مع أزرار الكاتيجوري
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.category;
      categoryButtons.forEach(b => b.classList.remove("bg-fuchsia-400", "text-white"));
      btn.classList.add("bg-fuchsia-400", "text-white");
      searchCards(); // يفلتر بالبحث + الفئة
    });
  });

  searchInput.addEventListener('input', searchCards);

  renderCards(currentPage);