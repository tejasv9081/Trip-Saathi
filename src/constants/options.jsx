export const SelectTravelersList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole traveler in exploration',
      icon: '✈️', // Single airplane emoji
      people: '1',
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two travelers in tandem',
      icon: '🥂', // Champagne glasses cheer emoji
      people: '2 People',
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A group of fun-loving adventurers',
      icon: '🏠', // House emoji
      people: '3 to 5 People',
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'A bunch of thrill-seekers',
      icon: '🎉', // Party emoji
      people: '5 to 10 People',
    },
  ];
  
export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '💰', // Money emoji
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'Keep cost on the average side',
      icon: '📊', // Chart emoji
    },
    {
      id: 3,
      title: 'Luxury',
      desc: "Don't worry about cost",
      icon: '✨', // Sparkles emoji
    },
  ];
  
export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totaldays} Days for {traveler} with a {budget} budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.';
  