const Userinfos = async() => {
    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching visitor info:", error.message);
        return null;
      }
}

export default Userinfos;
