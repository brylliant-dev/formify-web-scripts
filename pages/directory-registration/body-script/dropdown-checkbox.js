
  const runFieldPopulate = ({ target, items, searchFor }) => {
    const dropdownWrapper = $(`#checkbox-dropdown-wrapper-${target}`);
    const dropdownList = dropdownWrapper.find(
      `#checkbox-dropdown-list-${target}`
    );
    const checkboxTemplate = dropdownList.find(`#checkbox-field-template`);
    const hiddenTextField = $(`#${target}`);
    // const multiSelectOptions = multiSelectField.find("option");
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
  
      const truncateText = (text, maxLength = 60) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
      };
  
      const textContents = getCheckedBoxes()
        .find("span")
        .get()
        .map((c) => c.textContent.trim()); // Capitalize first letter
  
      const result = dropdownWrapper.find(".checkbox-dropdown-placeholder");
      if (textContents.length === 0) {
        result.text(`Pick ${capitalizeFirstLetter(target)}`);
      } else {
        result.text(truncateText(textContents.join(", ")));
      }
    };
  
    const modifyServicesTextField = () => {
      const slugs = getCheckedBoxes()
      .find("span")
      .get()
      .map((c) => c.getAttribute('for').trim()) // Capitalize first letter
  
      hiddenTextField.attr('value', slugs.join(", "))
  }
  
    const renderCollectionItems = (items) => {
      clearCheckboxes();
  
      resultLabel.css("display", items.length === 0 ? "block" : "none");
      resultLabel.text(
        `No data found for ${target}! ${
          items.length === 0 ? `Search for "${searchFor}"` : ""
        }`
      );
  
      const languageFilter = (item) => {
        return !(
          target === "languages" &&
          ["swahili", "chinese", "japanese"].includes(item.slug)
        );
      };
  
      items
        .filter(
          (item) =>
            !getCheckedBoxes()
              .map((_, c) => $(c).attr("id"))
              .get()
              .includes(item.slug)
        )
        .filter(languageFilter)
        .sort((a, b) => a.slug.localeCompare(b.slug))
        .forEach((item) => {
          const cloneField = checkboxTemplate.clone();
          const checkBox = cloneField.find('input[type="checkbox"]');
          const label = cloneField.find(".checkbox-template-label");
          // const getOption = multiSelectOptions.filter(function () {
          //   return $(this).val() === item.slug;
          // });
  
          checkBox.on("change", () => {
            // getOption.prop("selected", !getOption.prop("selected"));
  
            renderPlaceHolder();
            modifyServicesTextField()
          });
  
          // checkBox.prop("checked", getOption.prop("selected"));
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
      const othersFieldWrapper = $('#others-field-wrapper')
      console.log('othersFieldWrapper', othersFieldWrapper)

      dropdownList.empty().append(checkboxTemplate).append(othersFieldWrapper);
      console.log('dropdownList emptied')
      remainingBoxes.each(function () {
        dropdownList.append($(this));
      });
    };
  
    renderCollectionItems(items);
  };
  
  const callFn = async ({ target, searchFor = "" }) => {
    const itemsRaw = $(`#code-block-wrapper .${target}-collection-list`).last().find(`.${target}-collection-item`)
    const items = itemsRaw.get()
      .map((li) => JSON.parse(li.textContent))
      .filter(({ name, slug }) => {
        const validator = [name, slug].some((l) =>
          new RegExp(searchFor.toLowerCase().replace(/\*/g, ".*")).test(
            l.toLowerCase()
          )
        );
        return searchFor === "" || validator;
      });
  
    runFieldPopulate({
      target,
      items,
      searchFor,
    });
  };
  
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

setTimeout(() => {
  callFn({ target: "services", searchFor: "" });
  callFn({ target: "languages", searchFor: "" });
}, 500);
