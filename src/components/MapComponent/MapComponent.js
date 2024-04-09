import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, Circle } from 'react-leaflet';
import tileLayer from '../../config/tileLayer';
import L from 'leaflet';

const center = [56.18, 44];

const Location = ({ coords, setCoords }) => {
  const map = useMap();
  const [position, setPosition] = useState(null)

  useEffect(() => {
    map.locate({
      setView: true
    })
    map.on('locationfound', (event) => {
      setPosition(event.latlng)
    })
  }, [map])


  return position
    ? (
      <>
        <Circle center={position} weight={1} color={'blue'} fillColor={'blue'} fillOpacity={0.1} radius={500}/>
        <Marker position={position}>
          <Popup>Ваше местоположение</Popup>
        </Marker>
        <MyMarkers map={map} coords={coords} setCoords={setCoords} />
      </>
    )
    : null
}

const removeMarker = (index, map, legend, coords, setCoords ) => {
  setCoords({...coords, latitude: null, longitude: null})
  map.eachLayer((layer) => {
    if (layer.options && layer.options.pane === "markerPane") {
      if (layer.options.uniceid === index) {
        map.removeLayer(layer);
      }
    }
  });
}

const ShowMarkers = ({ mapContainer, legend, marker, coords, setCoords }) => {
    return <Marker
      key={marker.lat}
      uniceid={marker.lat}
      position={marker}
      draggable={true}
      eventHandlers={{
        moveend(e) {
          const { lat, lng } = e.target.getLatLng();
          setCoords({...coords, latitude: lat, longitude: lng})
        }
      }}
    >
      <Popup>
        <button onClick={() => removeMarker(marker.lat, mapContainer, legend, coords, setCoords)}>Удалить место</button>
      </Popup>
    </Marker>
}

const MyMarkers = ({ map, coords, setCoords }) => {
  const [marker, setMarker] = useState({
    lat: null,
    lng: null
  })
  const [legend, setLegend] = useState()

  useEffect(() => {
    if (!map) return;
    const legend = L.control({ position: "bottomleft" });

    const info = L.DomUtil.create("div", "legend");

    legend.onAdd = () => {
      return info;
    };

    legend.addTo(map);

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setMarker({...marker, lat: lat, lng: lng});
      setLegend(info);

      setCoords({...coords, latitude: lat, longitude: lng})
    })

  }, [map, marker]);

  return marker.lat && marker.lat && legend !== undefined ? (
      <ShowMarkers
        mapContainer={map}
        legend={legend}
        marker={marker}
        coords={coords}
        setCoords={setCoords}
      />
    )
    : null
}

const MapWrapper = ({ coords, setCoords }) => {
  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={true}
      style={{maxWidth: '100%', maxHeight: '600px', width: '100%', height: '600px'}}
    >
      <TileLayer {...tileLayer} />
      <Location coords={coords} setCoords={setCoords}/>
    </MapContainer>
  )
}

export default MapWrapper;