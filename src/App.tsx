import { useRef, useState } from "react";

const WeatherTypes:{type:string, img:string}[] = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
];

function App() {
    const api_key:string = "40b98854649841a1bae1e8845457a01c"
    const inputref:any =useRef(null)
    const [apiData, setApiData]:any = useState(null);
    const [showWeather, setShowWeather]:any= useState(null)
    const [loading, setLoading]  = useState<boolean>(false)
    const fetchWeather:any= async()=> {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputref.current.value}&appid=${api_key}&units=metric`;
        setLoading(true)
        fetch(URL)
        .then((res)=> res.json())
        .then((data)=>{
            setApiData(null)
            setShowWeather(WeatherTypes.filter((weather:any)=>weather.type === data.weather[0].main))
            setApiData(data)
            setLoading(false)
        })
        .catch((error)=> {
            setLoading(false)
            console.log(error)
        })
    }

      
    return (
        <div className="bg-gray-800 h-screen grid place-items-center">
            <div className="bg-white w-96 p-4 rounded-md">
                <div className="flex items-center justify-between">
                    <input  type="text" ref={inputref} placeholder="Enter Your Location" className="text-xl flex-1 border-b p-1 border-gray-200 font-bold uppercase mr-3"/>
                    <button onClick={fetchWeather}>
                        <img src="/search.png" alt="" className="w-8"/>
                    </button>
                </div>
                <div className={`duration-300 delay-75  overflow-hidden ${showWeather ? "h-[30rem]" : "h-0"}`}>
                    {
                        loading ? 
                        <div className="grid place-items-center h-full">
                            <img src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png" alt="..." className="w-14 mx-auto mb-2 animate-spin" />
                        </div> :
                        showWeather && (
                            <div className="text-center flex flex-col gap-6 mt-10">                                
                                {
                                    apiData ? (
                                        <>
                                            <p className="text-xl font-semibold">{apiData.name}, {apiData.sys.country}</p>
                                            <img src={showWeather[0]?.img} alt="" className="w-52 mx-auto"/>
                                            <h3 className="text-2xl mb-0 font-bold text-zinc-800 leading-none">{showWeather[0]?.type}</h3>
                                            <p className="mt-0 leading-none">{apiData.weather[0].description}</p>
                                            <div className="flex justify-center">
                                                <img src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png" alt="..." className="h-9 mt-1" />
                                                <h2 className="text-4xl font-extrabold">{apiData.main.temp}&#176;C</h2>
                                            </div>
                                        </>
                                    ) : 
                                    <div  className="text-center flex flex-col gap-6 mt-10">                                        
                                        <div className="flex justify-center"><img src="https://cdn-icons-png.flaticon.com/512/4275/4275497.png" alt="..." className="h-20 mt-1" /></div>
                                        <h3 className="text-2xl mb-0 font-bold text-zinc-800 leading-none">Not Found</h3>
                                    </div>
                                }
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default App;
