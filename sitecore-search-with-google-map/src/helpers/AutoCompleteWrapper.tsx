/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormikValues, useFormikContext } from "formik";
import { LoadScriptNext, Autocomplete } from "@react-google-maps/api";
import {
  handlePlaceChanged,
  onAutoSuggestionSubmitClick,
} from "./handlePlaceChanged";
import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AutoCompleteWrapper = (props: any): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteInputRef = useRef<any>(null);
  const formikData = useFormikContext<FormikValues>();

  /**To remove space and digits from the given string */
  function processAddress(address: string) {
    return address?.replace(/[0-9 ]/g, "");
  }
  //setting on change values
  useEffect(() => {
    /**
     * it removes all numbers and spaces from the given address.
     * This is used to check if the length of the input address is greater than or equal to the
     * maxCharLength.
     * @param address - The address to process.
     * @returns The processed address string.
     */

    const formFieldData = processAddress(formikData?.values?.AddressLine1);
    const addressData = processAddress(props?.addressLine1);
    if (!formFieldData && addressData?.length <= 0) {
      return;
    }

    // const autoSuggestionObserver = new MutationObserver(() => {
    const autoSuggestion =
      document.querySelectorAll<HTMLElement>(".pac-container");
    //INFO: we are using static length if want to change we can  change this variable to dynamic.
    const maxCharLength = 3;
    autoSuggestion.forEach((element) => {
      const hasChildren = element?.children?.length > 0;

      const isAddressLong =
        formFieldData?.length >= maxCharLength ||
        addressData?.length >= maxCharLength;
      const isDisplayed = element?.style?.display !== "none";

      if (hasChildren && isAddressLong && isDisplayed) {
        element?.classList?.add("!block");
        element?.classList?.remove("!hidden");
      } else {
        element?.classList?.add("!hidden");
        element?.classList?.remove("!block");
      }
    });
    // });

    // Observe the body or a parent container for changes in the suggestion list
    // const targetNode = document.getElementById(props?.id);
    // targetNode &&
    //   autoSuggestionObserver.observe(targetNode as Node, {
    //     attributes: true, // Ensures the observer checks inside the suggestion container
    //   });

    // Clean up observer when the component unmounts
    return () => {
      // autoSuggestionObserver.disconnect();
      const autoSuggestion =
        document.querySelectorAll<HTMLElement>(".pac-container");
      autoSuggestion.forEach((element) => {
        element?.classList?.remove("!block");
      });
    };
  }, [formikData?.values, formikData?.touched, props?.addressLine1]);

  return (
    <>
      <LoadScriptNext
        googleMapsApiKey={process.env.GOOGLE_API_KEY || ""} // Move to env. file.
        libraries={["places"]} //
      >
        <Autocomplete
          key={"autoCompleteWrapper"}
          onLoad={(ref) => (autocompleteInputRef.current = ref)}
          restrictions={{
            country: props?.options?.componentRestrictions?.country || "usa",
          }}
          options={props?.options}
          className={""}
          onPlaceChanged={() => {
            const selectedValue = handlePlaceChanged(
              autocompleteInputRef,
              formikData?.setFieldValue,
              props?.fieldMap,
              formikData?.setFieldTouched
            );
            if (props.onHandleChange && selectedValue) {
              !selectedValue?.isError && props.onHandleChange(selectedValue);
            }
          }}
        >
          {props.children({
            onAutoSuggestionSubmit: async (keyword: string) => {
              return await onAutoSuggestionSubmitClick(keyword, props?.options);
            },
          })}
        </Autocomplete>
      </LoadScriptNext>
    </>
  );
};

export default AutoCompleteWrapper;
