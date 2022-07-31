const config = [
  { label: "1", value: "1", preferable: true, disabled: false },
  { label: "2", value: "2", preferable: false, disabled: false },
  { label: "3", value: "3", preferable: false, disabled: false },
  { label: "4", value: "4", preferable: false, disabled: false },
  { label: "5", value: "5", preferable: false, disabled: true },
];

const app = () => {
  const outputContainer = document.querySelector("#root");
  const selectElement = document.createElement("div");
  const optionsContainer = document.createElement("div");

  selectElement.classList.add("title");
  outputContainer.appendChild(selectElement);
  optionsContainer.classList.add("menu", "hide");
  outputContainer.appendChild(optionsContainer);

  const createSelectOption = (option) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    if (option.preferable === true) optionElement.classList.add("selected");
    if (option.disabled === true) optionElement.classList.add("disabled");
    optionElement.dataset.value = option.value;
    optionElement.innerText = option.label;
    return optionElement;
  };

  const createAndRenderOptions = (container, options) => {
    container.innerHTML = ``;
    options.forEach((option) => {
      const optionHTML = createSelectOption(option);
      container.appendChild(optionHTML);
    });
  };

  const displaySelectedOption = (placeholder, options) => {
    const selectedElement = options.find(
      (option) => option.preferable === true
    );
    placeholder.innerText = selectedElement.label;
  };

  const handleSelect = () => {
    selectElement.classList.add("outline");
    createAndRenderOptions(optionsContainer, config);
    optionsContainer.classList.toggle("hide");
    selectElement.classList.toggle("active-select");
    handleSelectChange();
  };

  const handleStateChange = (options, selectedOption) => {
    options.forEach((option) => (option.preferable = false));
    const newChoice = options.find((option) => option.value === selectedOption);
    newChoice.preferable = true;
  };

  const handleSelectEvent = (event) => {
    if (event.target.classList.contains("disabled")) return;
    const elementValue = event.target.closest(".option").dataset.value;
    handleStateChange(config, elementValue);
    displaySelectedOption(selectElement, config);
    optionsContainer.classList.toggle("hide");
  };

  const handleWindowEvent = (event) => {
    if (
      event.target.closest(".title") ||
      event.target.classList.contains("disabled")
    )
      return;
    optionsContainer.classList.add("hide");
    selectElement.classList.remove("active-select", "outline");
  };

  const handleSelectChange = () => {
    optionsContainer.addEventListener("click", handleSelectEvent);
  };

  displaySelectedOption(selectElement, config);

  selectElement.addEventListener("click", handleSelect);
  window.addEventListener("click", handleWindowEvent);
};

app();
