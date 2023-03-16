import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export default function YandexMap() {
  return (
    <YMaps>
      <div>
        <Map defaultState={{ center: [55.75, 37.57], zoom: 13 }} width="600px" height="300px" >
        <Placemark defaultGeometry={[55.751574, 37.573856]} />
        </Map>
      </div>
    </YMaps>
  );
}
