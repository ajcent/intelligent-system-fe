import { useQuery } from "react-query";
import { getCrispValue } from "./api/crispValue.api";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { AirVent, DropletOff, Droplets, Fan, Heater, Wind } from "lucide-react";

const applianceLogger = (input: unknown) => {
  if (typeof input === "boolean") return input ? "On" : "Off";
  if (typeof input === "number") return input.toLocaleString();
  if (typeof input === "string") return input;
  return "Error";
};

const titleMapper = (title: string) => {
  switch (title) {
    case "aircon":
      return "Aircon";
    case "fan":
      return "Fan";
    case "ventilation":
      return "Ventilation";
    case "humidifier":
      return "Humidifier";
    case "dehumidifier":
      return "Dehumidifier";
    case "heater":
      return "Heater";
    default:
      return "Unknown";
  }
};

const iconMapper = (title: string) => {
  switch (title) {
    case "aircon":
      return <Wind />;
    case "fan":
      return <Fan />;
    case "ventilation":
      return <AirVent />;
    case "humidifier":
      return <Droplets />;
    case "dehumidifier":
      return <DropletOff />;
    case "heater":
      return <Heater />;
    default:
      return null;
  }
};

function App() {
  const { data, error, isLoading } = useQuery("posts", getCrispValue, {
    refetchInterval: 3000,
  });

  console.log(data);

  if (isLoading) return <div>Loading..</div>;
  if (data === undefined) return <div>Try reloading.</div>;

  const { data: appliances } = data;
  if (appliances === "") return <div>Turn on the Arduino.</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 h-screen p-6">
      {Object.entries(appliances).map((settings, idx) => (
        <Card
          key={idx}
          className="shadow-none flex flex-col wrap bg-muted border-none"
        >
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              {iconMapper(settings[0])}
              <p>{titleMapper(settings[0])}</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            <p
              className={`text-6xl ${
                typeof settings[1] === "boolean"
                  ? settings[1]
                    ? "text-green-400"
                    : "text-red-400"
                  : ""
              }`}
            >
              {`${applianceLogger(settings[1])}${
                settings[0] === "aircon" ? " °C" : ""
              }`}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default App;
