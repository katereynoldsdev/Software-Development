  //helper functions
  var dayOfWeek = "";
  function formatDate(date, month, year)
  {
    month = (month.length < 2) ? ('0' + month) : month;
    date = (date.length < 2)? ('0' + date) : date;
    return [year,month,date].join('-');
  }
  function getDayofWeek(date, month, year){
    var week_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dayOfWeek =  week_names[new Date([month,date,year].join('-')).getDay()];
  }
  function getFarenheitTemp(temp){
    return (9*temp/5)+32;
  }

  //run when the document object model is ready for javascript code to execute
  $(document).ready(function() {
    var url ='https://api.weatherstack.com/forecast?access_key=5bc82451636190abd9d7afe6fe9b20b5&query=Boulder&forecast_days=6'; //Place your weatherstack API Call Here - access_key to be used: 5bc82451636190abd9d7afe6fe9b20b5
    
    $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
      console.log(data);//Review all of the data returned
      console.log("Current Temp: " + data.current.temperature);//View Today's Temp
      var current_time = new Date(data.location.localtime);//Retrieve the current timestamp
      console.log(current_time.getDay());

      /*
        Read the current weather information from the data point values [https://weatherstack.com/documentation] to
        update the webpage for today's weather:
        1. image_today : This should display an image for today's weather.
                This will use the icon that is returned by the API. You will be looking for the weather_icons key in the response.*/
        document.getElementById("image_today").src = data.current.weather_icons[0];
        /*
        2. location: This should be appended to the heading. For eg: "Today's Weather Forecast - Boulder"8\*/
        document.getElementById("heading").innerText += " -" + " Boulder";
        document.getElementById("local_time").innerHTML = data.location.localtime;
        /*
        3. temp_today : This will be updated to match the current temperature. Use the getFarenheitTemp to convert the temperature from celsius to farenheit.*/
        var temp = getFarenheitTemp(data.current.temperature);
        document.getElementById("temp_today").innerText = temp + " F";
        /*
        4. thermometer_inner : Modify the height of the thermometer to match the current temperature. This means if the
                    current temperature is 32 F, then the thermometer will have a height of 32%.  Please note,
                    this thermometer has a lower boundary of 0 and upper boundary of 100.*/
        if(temp > 85)
          {
            document.getElementById("thermometer_inner").style.background = "red";
          }
        else if(temp < 65)
          {
            document.getElementById("thermometer_inner").style.background = "blue";
          }
        else
          {
            document.getElementById("thermometer_inner").style.background = "grey";
          }

        /*
        5. precip_today : This will be updated to match the current probability for precipitation. Be sure to check the unit of the value returned and append that to the value displayed.*/
        var precip = data.current.precip;
        document.getElementById("precip_today").innerText = precip + "mm"; 
        /*
        6. humidity_today : This will be updated to match the current humidity percentage (make sure this is listed as a
                  percentage %)*/
          var humid = data.current.humidity;
          document.getElementById("humidity_today").innerHTML = humid + "%";
        /*
        7. wind_today : This will be updated to match the current wind speed.*/
        var wind = data.current.wind_speed;
        document.getElementById("wind_today").innerHTML = wind;
        /*
        8. summary_today: This will be updated to match the current summary for the day's weather.*/
        var desc =data.current.weather_descriptions;
        document.getElementById("summary_today").innerText = desc;

      //helper function - to be used to get the key for each of the 5 days in the future when creating cards for forecasting weather
      function getKey(i){
          var week_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
          dayOfWeek=week_names[new Date(Object.keys(data.forecast)[i]).getDay()];
          return data.forecast[Object.keys(data.forecast)[i]];
      }
      /* Process the daily forecast for the next 5 days */

      /*
        For the next 5 days you'll need to add a new card listing:
          1. The day of the week
          2. The temperature high
          3. The temperature low
          4. Sunrise
          5. Sunset
          */
    
     var cards ='';
     var i;
     var day;

     for( i = 1; i < 6; i++ ){
       day = getKey(i);

       var weekday = day.date;
       var high = day.maxtemp;
       var low = day.mintemp;
       var sunRise = day.astro.sunrise;
       var sunSet = day.astro.sunset;

       cards += `<div style="width: 20%;">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title"> ${weekday}</h5>
                        <p class="card-text">High: ${high} F <br>
                          Low: ${low} F<br>
                          Sunrise: ${sunRise} <br>
                          Sunset: ${sunSet} </p>
                      </div>
                    </div>
                  </div>`; 
     }

     document.getElementById("5_day_forecast").innerHTML = cards;

    })
  });
