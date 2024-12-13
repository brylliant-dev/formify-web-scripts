const runFieldPopulate = ({ target, items, searchFor }) => {
    const dropdownWrapper = $(`#checkbox-dropdown-wrapper-${target}`);
    const dropdownList = dropdownWrapper.find(`#checkbox-dropdown-list-${target}`);
    const checkboxTemplate = dropdownList.find(`#checkbox-field-template`);
    const multiSelectField = $(`#${target}`);
    const multiSelectOptions = multiSelectField.find("option");
    const resultLabel = dropdownWrapper.find(".checkbox-result-label");
  
    const getCheckedBoxes = () => {
      // Use this to retain checked items
      const checkboxFields = dropdownList.find(".checkbox-field-template");
      return checkboxFields.filter(function () {
        return $(this).find(".checkbox-template").is(":checked");
      });
    };

    const renderPlaceHolder = () => {
      const capitalizeFirstLetter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
      };

      const truncateText = (text, maxLength = 20) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
      };
      

      const textContents = getCheckedBoxes()
        .find("span")
        .get()
        .map(c => c.textContent.trim()); // Capitalize first letter
      
        const result = dropdownWrapper.find('.checkbox-dropdown-placeholder')

        if(textContents.length === 0) {
          result.text(target === 'languages' ? 'Additional languages ​​we can communicate in' : `Pick ${capitalizeFirstLetter(target)}`)
        } else {
          result.text(truncateText(textContents.join(', ')))
        }
    };
    
    
  
    const renderCollectionItems = (items) => {
      clearCheckboxes();
  
      resultLabel.css("display", items.length === 0 ? "block" : "none");
      resultLabel.text(
        `No data found for ${target}! ${
          items.length === 0 ? `Search for "${searchFor}"` : ""
        }`
      );

    const languageFilter = (item) => {
        return !target === 'languages' && ['swahili', 'chinese', 'japanese'].includes(item)
    }
  
      items
        .filter(
          (item) =>
            !getCheckedBoxes()
              .map((_, c) => $(c).attr("id"))
              .get()
              .includes(item.slug)
        )
        .filter(languageFilter)
        .forEach((item) => {
          const cloneField = checkboxTemplate.clone();
          const checkBox = cloneField.find('input[type="checkbox"]');
          const label = cloneField.find(".checkbox-template-label");
          const getOption = multiSelectOptions.filter(function () {
            return $(this).val() === item.slug;
          });
  
          checkBox.on("change", () => {
            getOption.prop("selected", !getOption.prop("selected"));
            
      renderPlaceHolder()
          });
  
          checkBox.prop("checked", getOption.prop("selected"));
          checkBox.attr("name", item.slug);
          label.attr("for", item.slug);
          label.text(item.name);
          cloneField.css("display", "block");
          cloneField.attr("id", item.slug);
  
          dropdownList.append(cloneField);
        });
    };
  
    const clearCheckboxes = () => {
      const remainingBoxes = getCheckedBoxes();
      dropdownList.empty().append(checkboxTemplate);
      remainingBoxes.each(function () {
        dropdownList.append($(this));
      });
    };
  
    renderCollectionItems(items);
  };
  
  const callFn = async ({ target, searchFor }) => {
    const xanoApiId = {
      services: "R9uz4-0k/Get_Services_Items",
      languages: "R9uz4-0k/Get_Languages_Items",
    };
  
    const response = await fetch(
      `https://x8ki-letl-twmt.n7.xano.io/api:${xanoApiId[target]}?slug=${
        searchFor ?? ""
      }`
    );
    const data = await response.json();
  
    runFieldPopulate({
      target,
      items: data.map((i) => i.fieldData),
      searchFor,
    });
  };
  
  callFn({ target: "languages" });
  callFn({ target: "services" });
  
  const searchFieldLanguages = $("#search-field-languages");
  const searchFieldServices = $("#search-field-services");
  
  let debounceTimerLanguages;
  let debounceTimerServices;
  
  // For the "Languages" field
  searchFieldLanguages.on("keyup", (e) => {
    clearTimeout(debounceTimerLanguages); // Clear any existing timer
    debounceTimerLanguages = setTimeout(() => {
      callFn({ target: "languages", searchFor: e.target.value ?? "" });
    }, 500); // 500ms debounce
  });
  
  // For the "Services" field
  searchFieldServices.on("keyup", (e) => {
    clearTimeout(debounceTimerServices); // Clear any existing timer
    debounceTimerServices = setTimeout(() => {
      callFn({ target: "services", searchFor: e.target.value ?? "" });
    }, 500); // 500ms debounce
  });
  
