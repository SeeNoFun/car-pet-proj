import { FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;
  
    // headers for the API request
    const headers = {
      'X-RapidAPI-Key': 'a644710d9cmsh708f3089a2496f1p1f5bdbjsn973889fc0f7d',
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    };
  
    const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
      {
        headers: headers,
      }
    );
  
    // Parse the response as JSON
    const result = await response.json();
  
    return result;
  }
  

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50 //базовая стоимость аренды за сутки в долларах
    const mileageFactor = 0.1 //ставка за пройденную милю
    const ageFactor = 0.05 //дополнительная ставка за год возраста автомобиля

    //расчёт в зависимости от пробега и возраста
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor

    //аренда в день
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

    return rentalRatePerDay.toFixed(0)
}

export const updateSearchParams = (type: string, value: string) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search);
  
    // Set the specified search parameter to the given value
    searchParams.set(type, value);
  
    // Set the specified search parameter to the given value
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    return newPathname;
};