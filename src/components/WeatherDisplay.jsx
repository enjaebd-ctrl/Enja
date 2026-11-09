const weekdays = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
const months = [
  "januar", "februar", "marts", "april", "maj", "juni",
  "juli", "august", "september", "oktober", "november", "december",
];

// Teksterne til "Himmelen nu". De første to tal i ikon-koden fortæller vejrtypen
const skyTexts = {
  "01": "Klar himmel uden skyer",
  "02": "Lidt sol mellem skyerne",
  "03": "Spredte skyer på himlen",
  "04": "Tung og overskyet himmel",
  "09": "Byger på vej ind",
  "10": "Det regner lige nu",
  "11": "Torden og kraftig regn",
  "13": "Det sner lige nu",
  "50": "Tåge eller dis i luften",
};

const windDirections = ["nord", "nordøst", "øst", "sydøst", "syd", "sydvest", "vest", "nordvest"];

// Laver dato og tid for byen, fx "Søndag · 1. november, 15:36"
function makeDateText(time, timezone) {
  // Vi lægger byens tidsforskel til og bruger UTC-funktionerne
  const date = new Date((time + timezone) * 1000);
  const weekday = weekdays[date.getUTCDay()];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return weekday + " · " + day + ". " + month + ", " + hours + ":" + minutes;
}

function getFeelsLikeText(temperature) {
  if (temperature < 5) return "Koldt lige nu";
  if (temperature < 15) return "Køligt lige nu";
  if (temperature <= 24) return "Behageligt lige nu";
  return "Varmt lige nu";
}

function getHumidityText(humidity) {
  if (humidity < 40) return "Lav luftfugtighed";
  if (humidity <= 70) return "Moderat luftfugtighed";
  return "Høj luftfugtighed";
}

function getWindText(degrees) {
  // Nogle gange er der ingen retning, fordi det er vindstille
  if (degrees === undefined) return "Næsten vindstille";

  const index = Math.round(degrees / 45) % 8;
  return "Fra " + windDirections[index];
}

function getPressureText(pressure) {
  if (pressure < 1000) return "Lavt lufttryk";
  if (pressure > 1025) return "Højt lufttryk";
  return "Normalt lufttryk";
}

export default function WeatherDisplay({ weather }) {
  // Gør landekoden (DK) om til landets navn (Danmark)
  const countryName = new Intl.DisplayNames(["da"], { type: "region" }).of(weather.country);

  // Gør første bogstav stort, fx "Delvist skyet"
  const description = weather.description.charAt(0).toUpperCase() + weather.description.slice(1);

  const dateText = makeDateText(weather.time, weather.timezone);
  const skyText = skyTexts[weather.icon.slice(0, 2)] || "Se vejret herunder";
  const iconUrl = "https://openweathermap.org/img/wn/" + weather.icon + "@4x.png";

  // Vindhastigheden med komma, fx 4,2
  const windSpeedText = weather.windSpeed.toFixed(1).replace(".", ",");

  return (
    <>
      <div className="section-heading-row">
        <h2 className="section-title">Aktuelt vejr</h2>
        <p className="updated-label">
          <span className="green-dot"></span>
          OPDATERET LIGE NU
        </p>
      </div>

      <section className="current-weather-card">
        <div className="current-weather-left">
          <p className="current-country">{countryName}</p>
          <h3 className="current-city">{weather.city}</h3>
          <p className="current-date">— {dateText}</p>
          <p className="current-temperature">{weather.temperature}°</p>
          <p className="current-description">{description}</p>
          <p className="current-source">
            <span className="green-dot"></span>
            Vejrdata fra OpenWeather
          </p>
        </div>

        <div className="current-weather-middle">
          <p className="current-small-label">Føles som</p>
          <p className="current-feels-like">{weather.feelsLike}°</p>
        </div>

        <div className="current-weather-right">
          <img className="current-weather-icon" src={iconUrl} alt={weather.description} />
          <p className="sky-label">HIMMELEN NU</p>
          <p className="sky-text">{skyText}</p>
        </div>
      </section>

      <h2 className="details-title">Vejrforhold</h2>
      <p className="details-subtitle">Flere detaljer om vejret i {weather.city}</p>

      <div className="detail-cards">
        <div className="detail-card">
          <div className="detail-card-top">
            <span className="detail-icon detail-icon-orange">
              <img className="small-icon" src="/img/icon-feels-like.png" alt="" />
            </span>
            <p className="detail-label">FØLES SOM</p>
          </div>
          <p className="detail-value">{weather.feelsLike}°</p>
          <p className="detail-note">{getFeelsLikeText(weather.feelsLike)}</p>
        </div>

        <div className="detail-card">
          <div className="detail-card-top">
            <span className="detail-icon detail-icon-blue">
              <img className="small-icon" src="/img/icon-humidity.png" alt="" />
            </span>
            <p className="detail-label">LUFTFUGTIGHED</p>
          </div>
          <p className="detail-value">{weather.humidity}%</p>
          <p className="detail-note">{getHumidityText(weather.humidity)}</p>
        </div>

        <div className="detail-card">
          <div className="detail-card-top">
            <span className="detail-icon detail-icon-green">
              <img className="small-icon" src="/img/icon-wind.png" alt="" />
            </span>
            <p className="detail-label">VIND</p>
          </div>
          <p className="detail-value">
            {windSpeedText} <span className="detail-unit">m/s</span>
          </p>
          <p className="detail-note">{getWindText(weather.windDirection)}</p>
        </div>

        <div className="detail-card">
          <div className="detail-card-top">
            <span className="detail-icon detail-icon-purple">
              <img className="small-icon" src="/img/icon-pressure.png" alt="" />
            </span>
            <p className="detail-label">LUFTTRYK</p>
          </div>
          <p className="detail-value">
            {weather.pressure} <span className="detail-unit">hPa</span>
          </p>
          <p className="detail-note">{getPressureText(weather.pressure)}</p>
        </div>
      </div>
    </>
  );
}