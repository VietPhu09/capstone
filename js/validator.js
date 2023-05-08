function varlidator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var selectorForm = {};

  function validate(inputElement, rule) {
    var messageTag = getParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(options.errorSelector);
    var messageError;

    var rules = selectorForm[rule.selector];

    for (var i = 0; i < rules.length; i++) {
      switch (inputElement.type) {
        case "checkbox":
        case "radio":
          messageError = rules[i](
            formElement.querySelector(rule.selector + `:checked`)
          );
          break;
        default:
          messageError = rules[i](inputElement.value);
      }
      if (messageError) break;
    }

    if (messageError) {
      messageTag.innerText = messageError;
      getParent(inputElement, options.formGroupSelector).classList.add(
        "invalid"
      );
    } else {
      messageTag.innerText = "";
      getParent(inputElement, options.formGroupSelector).classList.remove(
        "invalid"
      );
    }

    return !messageError;
  }

  var formElement = document.querySelector(options.form);

  formElement.onsubmit = function (e) {
    e.preventDefault();

    var isFormValid = true;

    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);

      var isValid = validate(inputElement, rule);

      if (!isValid) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      if (typeof options.onSubmit === "function") {
        var enableInputs = formElement.querySelectorAll("[name]");
        var formValid = Array.from(enableInputs).reduce(function (
          values,
          input
        ) {
          switch (input.type) {
            case "checkbox":
              if (!input.matches(":checked")) return values;
              if (!Array.isArray(values[input.name])) {
                values[input.name] = [];
              }
              values[input.name].push(input.value);
              break;
            case "radio":
              values[input.name] = formElement.querySelector(
                'input[name="' + input.name + '"]:checked'
              ).value;
              break;
            default:
              values[input.name] = input.value;
          }

          return values;
        },
        {});
        options.onSubmit(formValid);
      }
    } else {
      // formElement.submit()
    }
  };

  options.rules.forEach(function (rule) {
    if (Array.isArray(selectorForm[rule.selector])) {
      selectorForm[rule.selector].push(rule.test);
    } else {
      selectorForm[rule.selector] = [rule.test];
    }

    // var inputElements = formElement.querySelectorAll(rule.selector)
    var inputElement = formElement.querySelector(rule.selector);

    // Array.from(inputElements).forEach(function (inputElement) {

    //     inputElement.onblur = function () {
    //         validate(inputElement, rule)
    //     }

    //     inputElement.oninput = function () {
    //         var messageTag = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
    //         messageTag.innerText = ''
    //         getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
    //     }

    // })
    inputElement.onblur = function () {
      validate(inputElement, rule);
    };

    inputElement.oninput = function () {
      var messageTag = getParent(
        inputElement,
        options.formGroupSelector
      ).querySelector(options.errorSelector);
      messageTag.innerText = "";
      getParent(inputElement, options.formGroupSelector).classList.remove(
        "invalid"
      );
    };

    inputElement.onchange = function () {
      var messageTag = getParent(
        inputElement,
        options.formGroupSelector
      ).querySelector(options.errorSelector);
      validate(inputElement, rule);
    };
  });
}

varlidator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : "Vui lòng nhập trường này.";
    },
  };
};

varlidator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      return regex.test(value) ? undefined : "Vui lòng nhập đúng giá trị";
    },
  };
};

varlidator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : `Gía trị tối thiểu là ${min} ký tự.`;
    },
  };
};

varlidator.isConfirmed = function (selector, getValuePassword, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getValuePassword()
        ? undefined
        : message || "Gía trị nhập vào không đúng";
    },
  };
};
