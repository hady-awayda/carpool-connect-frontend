import axios from "axios";

const findPlaceByName = async (name: string, limit = 5, page = 1) => {
  const encodedName = encodeURIComponent(name);
  const apiKey = "AIzaSyCzduXSDjg5mbh4txUTEVVu7LN1O53_fEc";
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedName}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK" && data.results.length > 0) {
      const places = data.results.slice(0, limit).map((item: any) => ({
        name: item.name,
        address: item.formatted_address,
        coords: {
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        },
        placeId: item.place_id,
        types: item.types,
      }));

      return places;
    } else {
      console.log("No results found or error occurred.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};

export default findPlaceByName;
