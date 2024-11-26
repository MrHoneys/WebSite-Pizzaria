let menus = {};
let selectedItems = [];

// Carrega os dados do JSON
fetch('sources/config/cardapio.json')
.then(response => response.json())
.then(data => {
  menus = data;
})
.catch(error => console.error('Erro ao carregar o JSON:', error));

// Função para mostrar o menu selecionado
function showMenu(menuKey) {
const menu = menus[menuKey];

if (menu) {
  document.getElementById("menuTitle").textContent = menu.title;
  const menuItems = document.getElementById("menuItems");
  menuItems.innerHTML = ""; // Limpa o conteúdo anterior

  // Adiciona os itens com imagens ao menu
  menu.items.forEach(item => {
    const div = document.createElement("div");
    div.className = "text-center";

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;
    img.className = "w-full rounded-lg shadow-md mb-4";

    const name = document.createElement("p");
    name.textContent = item.name;
    name.className = "text-lg font-bold text-gray-700";

    const chooseButton = document.createElement("button");
    chooseButton.textContent = "Escolher";
    chooseButton.className = "bg-green-600 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-700";
    chooseButton.onclick = () => addItemToSidebar(item.name);

    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(chooseButton);
    menuItems.appendChild(div);
  });

  document.getElementById("menuContent").classList.remove("hidden");
}
}

// Função para adicionar item à barra lateral
function addItemToSidebar(itemName) {
selectedItems.push(itemName);
updateSidebar();
}

// Função para atualizar a barra lateral
function updateSidebar() {
const sidebarContent = document.getElementById("sidebarContent");
sidebarContent.innerHTML = ""; // Limpa o conteúdo anterior

selectedItems.forEach(item => {
  const div = document.createElement("div");
  div.className = "text-gray-700 mb-2";
  div.textContent = item;
  sidebarContent.appendChild(div);
});

// Atualiza o link do WhatsApp com a mensagem pré-formatada
const whatsappMessage = encodeURIComponent(`Olá! Encontrei seu site e gostaria de pedir as seguintes pizzas :\n\n*${selectedItems.join("\n")}*\n\nQual é o valor total?`);
const whatsappLink = document.getElementById("whatsappLink");
whatsappLink.href = `https://wa.me/+5541984633130?text=${whatsappMessage}`;

// Exibe a barra lateral
document.getElementById("sidebar").classList.add("show");
}



  // Selecionar a barra lateral e o botão de fechar
  const sidebar = document.getElementById('sidebar');
  const closeSidebarBtn = document.getElementById('closeSidebar');

  // Função para fechar a barra lateral
  closeSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('show');
  });