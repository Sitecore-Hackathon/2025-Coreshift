import { FormikHelpers, FormikValues } from "formik";
import { MutableRefObject } from "react";

export const handlePlaceChanged = (
  addressInputRef: MutableRefObject<
    google.maps.places.Autocomplete | undefined
  >,
  setFieldValue: FormikHelpers<FormikValues>["setFieldValue"],
  fieldMap: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    stateCode?: string;
    zipcode?: string;
    country?: string;
    state?: string;
  },
  setFieldTouched: FormikHelpers<FormikValues>["setFieldTouched"]
) => {
  if (addressInputRef.current) {
    const data = addressInputRef.current?.getPlace();
    if (data) {
      let fullStreetAddress = "" as string;
      data?.address_components?.forEach(
        (component: google.maps.GeocoderAddressComponent) => {
          if (fieldMap?.zipcode && component?.types?.includes("postal_code")) {
            setFieldValue(fieldMap?.zipcode, component?.long_name);
            setTimeout(() => {
              if (fieldMap?.zipcode) {
                setFieldTouched(fieldMap.zipcode, true);
              }
            }, 100);
          }
          if (fieldMap?.addressLine1) {
            // this will be concate with ",_" and will replace the address below.
            if (component?.types?.includes("street_number")) {
              fullStreetAddress +=
                (fullStreetAddress ? ",_" : "") + component?.short_name;
            }
            if (component?.types?.includes("route")) {
              fullStreetAddress +=
                (fullStreetAddress ? ",_" : "") + component?.short_name;
            }
          }
          if (fieldMap?.city && component?.types?.includes("locality")) {
            setFieldValue(fieldMap?.city, component?.long_name);
            setTimeout(() => {
              if (fieldMap?.city) {
                setFieldTouched(fieldMap.city, true);
              }
            }, 10);
          }
          if (fieldMap?.country && component?.types?.includes("country")) {
            setFieldValue(fieldMap?.country, component?.short_name);
            setTimeout(() => {
              if (fieldMap?.country) {
                setFieldTouched(fieldMap.country, true);
              }
            }, 10);
          }
          if (
            fieldMap?.stateCode &&
            component?.types?.includes("administrative_area_level_1")
          ) {
            setFieldValue(fieldMap?.stateCode, component?.short_name);
            setTimeout(() => {
              if (fieldMap?.stateCode) {
                setFieldTouched(fieldMap.stateCode, true);
              }
            }, 10);
          }
          if (
            fieldMap?.state &&
            component?.types?.includes("administrative_area_level_1")
          ) {
            setFieldValue(fieldMap?.state, component?.long_name);
            setTimeout(() => {
              if (fieldMap?.state) {
                setFieldTouched(fieldMap?.state, true);
              }
            }, 10);
          }
        }
      );
      // set address line 1 field value which includes street number + route
      if (fieldMap?.addressLine1) {
        // removing this with ,_ and add space between street and route.
        fullStreetAddress = fullStreetAddress?.replace(/,_/, " ");
        // set the value in field after format the street and route combine in one field.
        setFieldValue(fieldMap?.addressLine1, fullStreetAddress);
        setTimeout(() => {
          if (fieldMap?.addressLine1) {
            setFieldTouched(fieldMap?.addressLine1, false);
          }
        }, 10);
      }
      return getGeometryData(data);
    } else {
      return null;
    }
  }
  return null;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getGeometryData = (
  mapData: any,
  keyword?: string,
  options?: any
) => {
  if (options?.bypassBoundErrorCheck || mapData) {
    return {
      keyword: keyword || mapData?.formatted_address,
      lat: mapData?.geometry?.location?.lat(),
      lng: mapData?.geometry?.location?.lng(),
      isError: false,
      results: mapData,
    };
  } else {
    return { isError: true, keyword };
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onAutoSuggestionSubmitClick = async (
  keyword: string,
  options?: any
) => {
  try {
    const geocoder = await new google.maps.Geocoder();
    const geocoderData = await geocoder.geocode({
      address: keyword,
      region: options?.componentRestrictions?.country,
      bounds: options?.componentRestrictions?.bounds,
    });
    return getGeometryData(geocoderData?.results[0], keyword, options);
  } catch (error) {
    console.error(error);
    return { isError: true, keyword };
  }
};

//Address Validation
export const isValidAddress = async (keyword: string) => {
  const geocoder = new google.maps.Geocoder();
  try {
    const res: google.maps.GeocoderResponse = await geocoder.geocode(
      { address: keyword },
      (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          return results;
        } else {
          return null;
        }
      }
    );
    if (res && res?.results?.[0]?.geometry?.location_type === "ROOFTOP") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};
