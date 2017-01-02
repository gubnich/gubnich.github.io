jQuery(document).ready(function($){
    //Местоположение: долгота, широта и коэффициент увеличения
    var latitude = 53.909094,
        longitude = 27.522675,
        map_zoom = 15;

    //Адрес иконки с маркером
    var marker_url = './icons/marker.png';
    
    var	main_color = '#007148', //основной цвет
        saturation_value= -1, //насыщенность
        brightness_value= 1; //яркость

    //Стили для элементов на карте

    var style= [
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "gamma": 0.72
                }
            ]
        }
    ];
    //Создание точки на карте
    var map_options = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: map_zoom,
        panControl: false,
        zoomControl: true,
        mapTypeControl: true,
        streetViewControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style
    }
    //Инициализация карты
    var map = new google.maps.Map(document.getElementById('map'), map_options);
    //Добавляем свой маркер местонахождения на карту (свою иконку)
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        visible: true,
        icon: marker_url,
        title: 'IT-Academy'
    });

google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
});

