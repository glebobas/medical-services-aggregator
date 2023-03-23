import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export default function YandexMap(props) {
  const {geo} = props
  console.log(geo)
  return (
    <YMaps>
      <div>
        <Map defaultState={{ center: geo, zoom: 4 }} width="600px" height="300px" >
        <Placemark defaultGeometry={geo} />
        </Map>
      </div>
    </YMaps>
  );
}
