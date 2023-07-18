
//
// ymaps.ready(function () {
//
//     var myMap = new ymaps.Map('map', {
//             center: [55.751574, 37.573856],
//             zoom: 9,
//             behaviors: ['default', 'scrollZoom']
//         }, {
//             searchControlProvider: 'yandex#search'
//         }),
//         /**
//          * Создадим кластеризатор, вызвав функцию-конструктор.
//          * Список всех опций доступен в документации.
//          * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#constructor-summary
//          */
//         clusterer = new ymaps.Clusterer({
//             /**
//              * Через кластеризатор можно указать только стили кластеров,
//              * стили для меток нужно назначать каждой метке отдельно.
//              * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
//              */
//             preset: 'islands#invertedVioletClusterIcons',
//             /**
//              * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
//              */
//             groupByCoordinates: false,
//             /**
//              * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
//              * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
//              */
//             clusterDisableClickZoom: true,
//             clusterHideIconOnBalloonOpen: false,
//             geoObjectHideIconOnBalloonOpen: false
//         }),
//         /**
//          * Функция возвращает объект, содержащий данные метки.
//          * Поле данных clusterCaption будет отображено в списке геообъектов в балуне кластера.
//          * Поле balloonContentBody - источник данных для контента балуна.
//          * Оба поля поддерживают HTML-разметку.
//          * Список полей данных, которые используют стандартные макеты содержимого иконки метки
//          * и балуна геообъектов, можно посмотреть в документации.
//          * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
//          */
//         getPointData = function (index) {
//             return {
//                 balloonContentHeader: '<font size=3><b><a target="_blank" href="https://yandex.ru">Здесь может быть ваша ссылка</a></b></font>',
//                 balloonContentBody: '<p>Ваше имя: <input name="login"></p><p>Телефон в формате 2xxx-xxx:  <input></p><p><input type="submit" value="Отправить"></p>',
//                 balloonContentFooter: '<font size=1>Информация предоставлена: </font> балуном <strong>метки ' + index + '</strong>',
//                 clusterCaption: 'метка <strong>' + index + '</strong>'
//             };
//         },
//         /**
//          * Функция возвращает объект, содержащий опции метки.
//          * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
//          * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
//          */
//         getPointOptions = function () {
//             return {
//                 preset: 'islands#violetIcon'
//             };
//         },
//         points = [
//             [55.831903,37.411961]
//         ],
//         geoObjects = [];
//
//     /**
//      * Данные передаются вторым параметром в конструктор метки, опции - третьим.
//      * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
//      */
//     for(var i = 0, len = points.length; i < len; i++) {
//         geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
//     }
//
//     /**
//      * Можно менять опции кластеризатора после создания.
//      */
//     clusterer.options.set({
//         gridSize: 80,
//         clusterDisableClickZoom: true
//     });
//
//     /**
//      * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
//      * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
//      */
//     clusterer.add(geoObjects);
//     myMap.geoObjects.add(clusterer);
//
//     /**
//      * Спозиционируем карту так, чтобы на ней были видны все объекты.
//      */
//
//     myMap.setBounds(clusterer.getBounds(), {
//         checkZoomRange: true
//     });
// });

function data_json(point){
    console.log(point);
    return {"type": "Feature", "id": point.id, "geometry": {"type": "Point", "coordinates": [point.pos_x, point.pos_y]}, "properties":
            {"balloonContentHeader": "<font size=3><b>"+point.user_id+"</b></font>",
                "balloonContentBody": "<p>"+point.category+"</p><p><p>"+point.text+"</p> </p><p></p>",
                "balloonContentFooter": "<input type=\'submit\' value=\'Помочь\'>",
                "clusterCaption": "<strong>"+point.user_id+"</strong>", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}};
}


ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('map', {
            center: [53.2034, 50.1808],
            zoom: 12
        }, {
            searchControlProvider: 'yandex#search'
        }),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            clusterDisableClickZoom: true
        });

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.geoObjects.add(objectManager);


    GET('/map/getpoint')
        .then(points => {
            return{"type": "FeatureCollection",
                "features":points?.map(p => data_json(p))}
        } )
        .then(o => objectManager.add(o));

    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader:'Оставить заявку',
                contentBody:'<form name=\'f\' action="/" method=\'post\'><p>Тематика проблемы: <input name="category"></p><p><p>Описание проблемы:</p>' +
                    '  <textarea name="text"></textarea></p><p>' +
                    '<input name="pos_x" hidden="hidden" value="'+coords[0]+'"><input name="pos_y" hidden="hidden" value="'+coords[1]+'">' +
                    '<input type=\'submit\' value=\'Отправить\'></p>' +
                    '<p>Координаты: ' + [
                        coords[0].toPrecision(6),
                        coords[1].toPrecision(6)
                    ].join(', ') + '</p></form>',
                contentFooter:'<sup></sup>'
            });
        }
        else {
            myMap.balloon.close();
        }
    });

}