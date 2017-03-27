var user = "";
var articlesService = (function () {
    var articles = [{
        Id: "1",
        Title: "Что изменится с 1 марта: подорожают сигареты и звонки со стационарных телефонов",
        Summary: "С 1 марта в Беларуси вырастут цены на некоторые марки сигарет, а также подорожают звонки" +
        " со стационарных телефонов. FINANCE.TUT.BY посмотрел, как изменения отразятся на кошельках белорусов.",
        CreatedAt: new Date("2017-02-28T08:00:00+03:00"),
        Author: "FINANCE.TUT.BY",
        Content: "С 1 марта вырастут цены на некоторые марки белорусских сигарет. В частности, подорожает" +
        " продукция Гродненской табачной фабрики «Неман» — на 2−9 копеек за пачку. Некоторые виды Oscar " +
        "станут дороже на 2 копейки, Pall Mall Red — на 5 копеек, а некоторые виды Cooper — на 9 копеек." +
        " Цены на сигареты фабрики «Табак-Инвест», а также на импортные сигареты не изменятся. Напомним," +
        " производители и импортеры могут изменять цены на свою продукцию каждый месяц. Звонки со " +
        "стационарных телефонов станут дороже Национальный оператор связи «Белтелеком» с 1 марта" +
        " внесет изменения в некоторые тарифы на услуги. Средний размер повышения стоимости составит " +
        "9% к уровню тарифов, которые действовали в 2016 году."
    }, {
        Id: "2",
        Title: "Renault завершает распродажу. Остались последние авто 2016 года по специальной цене",
        Summary: "Компания Renault завершает распродажу. В наличии у дилеров остались последние авто" +
        " 2016 года выпуска. Это последняя возможность приобрести новый Renault по специальной цене.",
        CreatedAt: new Date("2017-02-28T09:00:00+03:00"),
        Author: "*На правах рекламы",
        Content: "Благодаря программе Renault Finance, новые модели Renault доступны в рассрочку в белорусских" +
        " рублях. Кроме того, имеется возможность сдать в трейд-ин ваш Renault с пробегом в зачет стоимости нового."
    }, {
        Id: "3",
        Title: "'Газпром' повысит стоимость газа для Евросоюза",
        Summary: "Экспортная стоимость газа для Евросоюза в текущем году может составить " +
        "180−190 долларов за тысячу кубометров. Об этом сообщил заместитель председателя" +
        " правления «Газпрома» Александр Медведев, передает РИА 'Новост'",
        CreatedAt: new Date("2017-02-28T09:40:00+03:00"),
        Author: "Lenta.ru",
        Content: "Он отметил, что в 2016-м европейские страны платили за топливо меньше — порядка 167" +
        " долларов за тысячу кубометров. «Европа была, есть и остается приоритетным рынком для „Газпрома“»," +
        " — добавил представитель российской компании."
    }, {
        Id: "4",
        Title: "МИД: Беларусь продолжит взаимодействие с ЕС для полной отмены санкций",
        Summary: "Белорусская сторона продолжит взаимодействие с ЕС в целях полной отмены санкций, заявили" +
        " в МИД Беларуси, комментируя решение Евросоюза продлить на год оружейное эмбарго в отношении нашей" +
        " страны и санкции в отношении четырех чиновников. В МИД отметили, что изначально исходят из того," +
        " что санкции несправедливы и контрпродуктивны.",
        CreatedAt: new Date("2017-02-27T18:24:00+03:00"),
        Author: "TUT.BY",
        Content: "«Разблокировав поставки в Беларусь снаряжения для биатлона, Евросоюз лишь частично" +
        " устранил изначальное противоречие в собственном режиме оружейного эмбарго. Однако сохраняющийся" +
        " оружейный запрет продолжает распространяться на товары, не имеющие никакого отношения" +
        " к заявленным ЕС целям», — сказано в сообщении ведомства."
    }, {
        Id: "5",
        Title: "Новая старая безработица: откуда взялись и что означают новые, непривычно высокие цифры",
        Summary: "Сегодня Белстат опубликовал данные об уровне безработицы. Они отличаются от тех, которые мы" +
        " привыкли видеть в официальных отчетах. Это данные о фактической безработице за 2016 год.",
        CreatedAt: new Date("2017-02-27T16:24:00+03:00"),
        Author: "Александр Чубрик, TUT.BY",
        Content: ""
    }, {
        Id: "6",
        Title: "'Камісія згуляла ў глуханямых'. Обсуждение стройки в Куропатах чиновниками не состоялось",
        Summary: "Обсудили все, кроме возведения бизнес-центра в Куропатах. Это краткий итог общественных " +
        "слушаний по застройке Зеленого Луга, которые прошли сегодня в администрации Первомайского района. " +
        "Гражданские активисты и местные жители принесли на открытое собрание тысячу подписей за пересмотр " +
        "проекта. Но обращение не рассмотрели. В ответ на это вечером 27 февраля активисты провели возле " +
        "стройплощадки акцию протеста",
        CreatedAt: new Date("2017-02-27T16:07:00+03:00"),
        Author: "TUT.BY",
        Content: "В итоге комиссия утвердила прежний план застройки зоны, куда входит и площадка бизнес-центра" +
        " на улице Мирошниченко. Лишь один человек выступил против, еще один — воздержался."
    }, {
        Id: '7',
        Title: "Шуневич рассказал, в каких городах появятся центры временного содержания незаконных мигрантов",
        Summary: "В Беларуси центры временного содержания незаконных мигрантов будут созданы в Витебске, Гомеле" +
        " и Лиде. Об этом в интервью БЕЛТА рассказал министр внутренних дел Игорь Шуневич. По его " +
        "словам, появятся центры не раньше 2018 года.",
        CreatedAt: new Date("2017-02-27T20:03:00+03:00"),
        Author: "TUT.BY",
        Content: "Курирует вопросы создания центров специальная рабочая группа, состоящая из сотрудников МВД " +
        "и белорусского представительства Международной организации по миграции (МОМ). Центры появятся в " +
        "нашей стране не раньше 2018 года."
    }, {
        Id: "8",
        Title: "Минское 'Динамо' обыграло ярославский 'Локомотив' в четвертом матче плей-офф КХЛ",
        Summary: "Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2.",
        CreatedAt: new Date("2017-02-27T22:09:00+03:00"),
        Author: "SPORT.TUT.BY",
        Content: "Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот " +
        "раз очень эффективно использовали свои моменты. В первом периоде отличились Андрей Степанов и " +
        "Александр Павлович — 2:0. Вторая двадцатиминутка началась с ошибки минчан, которой воспользовался " +
        "в меньшинстве Даниил Апальков. Впрочем, практически сразу Евгений Ковыршин восстановил преимущество в две шайбы."
    }, {
        Id: "9",
        Title: "Бывший и. о. начальника ГАИ Барановичей, обвиняемый в смертельном ДТП, признал вину полностью",
        Summary: "Суд Ляховичского района 28 февраля начал рассмотрение уголовного дела по обвинению бывшего " +
        "временно исполняющего обязанности начальника ОГАИ Барановичского ГОВД Андрея Волковыцкого в ДТП, " +
        "которое унесло жизнь 36-летней женщины. На первом заседании выступит сторона обвинения, обвиняемый, " +
        "а также заслушают свидетелей. Обвиняемый полностью признал свою вину.",
        CreatedAt: new Date("2017-02-28T11:55:00+03:00"),
        Author: "Станислав Коршунов",
        Content: "Суд начался в 10.00. Обвинение поддерживает старший прокурор отдела прокуратуры Брестской " +
        "области Геннадий Бурый. По материалам дела Андрей Волковыцкий обвиняется в нарушении ПДД лицом, " +
        "управляющим транспортным средством в состоянии алкогольного опьянения, повлекшее по неосторожности " +
        "смерть человека (ч. 4 ст. 317 УК). Если его вина будет доказана, ему грозит до 7 лет лишения свободы" +
        " с лишением права занимать определенные должности и заниматься определенной деятельностью. ДТП вызвало " +
        "резонанс в обществе: после него в МВД начались проверки сотрудников с использованием полиграфа."
    }, {
        Id: "10",
        Title: "'Луркоморье' в Беларуси заблокировали из-за мата",
        Summary: "В выходные белорусские пользователи заметили, что интернет-энциклопедия «Луркоморье» " +
        "(lurkmore.to) перестала быть доступна. В Министерстве информации уточнили причину блокировки.",
        CreatedAt: new Date("2017-02-28T11:40:00+03:00"),
        Author: "42.TUT.BY",
        Content: "Министерство вынесло решение о блокировке по обращению из Национальной библиотеки Беларуси. Согласно" +
        " решению ведомства, блокировке подлежат все страницы ресурса, включая доступ по «защищенному» протоколу HTTPS."
    }, {

        Id: "11",
        Title: "В Минске Volkswagen сбил на переходе женщину",
        Summary: "В Минске под колеса автомобиля попала женщина. Наезд произошел 28 февраля, около 07.40, на столичной" +
        " улице Космонавтов. Об этом AUTO.TUT.BY рассказала представитель ГАИ Московского района Любовь Трепашко.",
        CreatedAt: new Date("2017-02-28T11:34:00+03:00"),
        Author: "AUTO.TUT.BY",
        Content: "По предварительной информации, 33-летний водитель Volkswagen ехал по улице Космонавтов со стороны " +
        "улицы Есенина в направлении проспекта Дзержинского и около дома № 23/1 сбил 49-летнюю женщину, которая" +
        " переходила дорогу по нерегулируемому пешеходному переходу слева направо по ходу движения автомобиля."
    }, {
        Id: "12",
        Title: "Подробности попытки заказного убийства в Минске: задержан директор крупной фирмы вместе с зятем",
        Summary: "Бизнесмена, его дочь и зятя подозревают в том, что они несколько месяцев пытались найти киллера," +
        " чтобы убрать своего партнера. Жизнь индивидуального предпринимателя оценили в 5 тысяч долларов.",
        CreatedAt: new Date("2017-02-28T11:17:00+03:00"),
        Author: "Катерина Борисевич",
        Content: "— Мы ничего не знаем, нас никто не уведомлял. Михаила Александровича (все " +
        "имена изменены. — Прим. TUT.BY) нет на рабочем месте с 23 февраля, — рассказывают в " +
        "приемной минской фирмы, которую возглавляет задержанный 58-летний бизнесмен."
    }, {
        Id: "13",
        Title: "Жена Караченцова рассказала о состоянии попавшего в аварию актера",
        Summary: "Актер Николай Караченцов после ДТП в Щелковском районе Подмосковья переведен из местной " +
        "больницы в НИИ имени Склифосовского. После осмотра врачей его могут выписать, заявила жена артиста " +
        "Людмила Поргина, передает Интерфакс во вторник, 28 февраля.",
        CreatedAt: new Date("2017-02-28T11:10:00+03:00"),
        Author: "Lenta.ru",
        Content: "Она раскрыла подробности аварии, в которую попала вместе с Караченцовым. «Мы ехали по главной" +
        " Пушкинской улице в кино, другая машина выезжала на главную улицу. Он нас ударил, мы перевернулись сразу," +
        " нас было четверо. Слава богу, все остались живы», — отметила жена актера."
    }, {
        Id: "14",
        Title: "В Минске за сутки горели шесть автомобилей",
        Summary: "За прошедшие сутки в Минске спасатели получили 4 сообщения о загорании автомобилей. В " +
        "результате пожаров повреждены шесть транспортных средств. Об этом сообщили в МЧС.",
        CreatedAt: new Date("2017-02-28T11:02:00+03:00"),
        Author: "AUTO.TUT.BY",
        Content: "Первый пожар произошел утром 27 февраля напротив здания № 10 по улице Толстого — горел Peugeot " +
        "307. Спасатели установили, что пожар произошел в моторном отсеке автомобиля. Огонь повредил лакокрасочное" +
        " покрытие капота и правого крыла, а также блок-фару."
    }, {
        Id: "15",
        Title: "Ведущими 'Евровидения' впервые в истории будут трое мужчин",
        Summary: "Дирекция песенного конкурса определилась с ведущими песенного конкурса. Ими стали" +
        " телеведущий, радиоведущий, пародист Александр Скичко, ведущий канала «Украина» Владимир" +
        " Остапчук, а также комментатор и журналист Тимур Мирошниченко.",
        CreatedAt: new Date("2017-02-28T10:58:00+03:00"),
        Author: "TUT.BY",
        Content: "Как сообщает официальный «Евровидения», Скичко и Остапчук станут хозяевами конкурса" +
        " и будут приветствовать международную аудиторию во время двух полуфинальных концертов и собственно" +
        " финала. Именно они объявят фамилию победителя «Евровидения»."
    }, {
        Id: "16",
        Title: "На аукционы в этом году выставят два пионерлагеря под Минском, столовую и прошлогодний неликвид",
        Summary: "В Минске в этом году планируется выставить на аукцион 18 неиспользуемых объектов " +
        "недвижимости, сообщила директор «Минскгоримущество» Галина Степуренко, передает БЕЛТА. Среди " +
        "них — детский оздоровительный лагерь «Зеленое», лагерь труда и отдыха «Свитанок».",
        CreatedAt: new Date("2017-02-28T10:12:00+03:00"),
        Author: "REALTY.TUT.BY",
        Content: "Планируют также продать столовую по ул. Бровки 32, а также 12 изолированных помещений," +
        " которые могут быть привлекательны для предпринимателей и ремесленников. При этом город понимает:" +
        " на восстановление потребительских качеств этих помещений требуются значительные средства. В " +
        "список аукционных лотов вошли некоторые объекты, которые не удалось реализовать в прошлом году." +
        " Это здание бывшего детсада на ул. Л. Украинки, 12/4; незавершенный незаконсервированный " +
        "строительный объект на ул. Инженерной, 1Л, и капитальное строение на ул. Инженерной, 1/10."
    }, {
        Id: "17",
        Title: "В Сеть попали первые подробности о китайском флагмане OnePlus 5",
        Summary: "Компания OnePlus пропустит цифру 4 в названии своего флагманского смартфона 2017 " +
        "года и сразу выпустит на рынок OnePlus 5, сообщает koreaportal.com. Ресурс также раскрыл " +
        "практически все технические характеристики будущего флагмана.",
        CreatedAt: new Date("2017-02-28T10:48:00+03:00"),
        Author: "Антон Мерзляков, TUT.BY",
        Content: "Сейчас актуальным флагманским смартфоном компании является OnePlus 3T. По сообщению" +
        " источника, в следующем аппарате цифра «4» в названии будет пропущена (в Китае она считается " +
        "несчастливой) и на рынок сразу выйдет OnePlus 5. Ожидается, что смартфон получит корпус из " +
        "алюминия и стекла или из керамики. Экран в аппарате, скорее всего, будет загнут на манер " +
        "смартфонов Galaxy Edge. Также сообщается, что устройство получит 23-мегапиксельную основную " +
        "и 16-мегапиксельную фронтальные камеры, 6 или 8 ГБ оперативной и 256 ГБ встроенной памяти и " +
        "порт USB-C. Емкость аккумулятора установится на уровне 4000 мАч (с поддержкой быстрой зарядки)."
    }, {
        Id: "18",
        Title: "Умер 2-кратный олимпийский чемпион и 9-кратный чемпион мира в составе сборной СССР по хоккею",
        Summary: "В ночь на 28 февраля скончался знаменитый советский хоккеист и тренер, двукратный " +
        "олимпийский чемпион, девятикратный чемпион мира, одиннадцатикратный чемпион СССР, участник " +
        "Суперсерий с Канадой 1972 и 1974 годов, член наблюдательного совета ХК ЦСКА, президент клуба " +
        "юных хоккеистов «Золотая шайба» Владимир Петров, сообщает официальный ",
        CreatedAt: new Date("2017-02-28T10:50:00+03:00"),
        Author: "SPORT.TUT.BY",
        Content: "Будущий центрфорвард знаменитой тройки ЦСКА и сборной СССР Михайлов — Петров — " +
        "Харламов родился 30 июня 1947 года в подмосковном Красногорске. В детстве пробовал себя в" +
        " разных видах спорта: от бокса и футбола до хоккея с мячом, но остановил свой выбор на " +
        "хоккее с шайбой. Его первым тренером был знаменитый нападающий сборной СССР Алексей Михайлович" +
        " Гурышев. Свой первый серьезный титул — всесоюзное молодежное первенство 1965 года — выиграл " +
        "в 16 лет в составе команды «Крылья Советов», за которую выступал до 1967 года."
    }, {
        Id: "19",
        Title: "Как выглядит новый Nokia 3310: видеообзор",
        Summary: "Самой главной премьерой выставки MWC-2017 в Барселоне стал обычный телефон — о" +
        "бновленная классика Nokia 3310. Рассказываем о его основных особенностях в видеоролике.",
        CreatedAt: new Date("2017-02-28T10:11:00+03:00"),
        Author: "Дмитрий Смирнов, Всеволод Зарубин",
        Content: "Sample text"
    }, {
        Id: "20",
        Title: "Корейские СМИ: убийцы старшего брата Ким Чен Ына бежали через Россию",
        Summary: "К убийству Ким Чен Нама, старшего брата главы КНДР Ким Чен Ына, в какой-то мере причастна и " +
        "Россия. По данным южнокорейских СМИ, предполагаемые убийцы брата диктатора скрылись через Москву и " +
        "Владивосток, при этом российская сторона отказалась их задерживать, несмотря на просьбу корейских коллег.",
        CreatedAt: new Date("2017-02-28T10:55:00+03:00"),
        Author: "Газета.Ru",
        Content: "Южная Корея просила Россию найти четырех подозреваемых в убийстве Ким Чен Нама, сводного " +
        "брата северокорейского лидера, до того как они вернутся в Пхеньян, пишет газета JoongAng Ilbo. " +
        "Четверо граждан КНДР (Ли Чжи Хён, Ли Чжэ Нам, Хон Чон Хак и О Чжон Гиль) покинули Малайзию, " +
        "воспользовавшись авиарейсами через Джакарту, Дубай, Москву и Владивосток. По данным источника " +
        "издания в дипломатических кругах, Сеул впервые обратился к Москве с просьбой в срочном порядке " +
        "выяснить местонахождение и задержать подозреваемых для проверки их личностей."
    }];
    var Articles = JSON.parse(localStorage.getItem('data'));
    var deletedArticles = JSON.parse(localStorage.getItem('delete'));
    if (Articles) {
        Articles.forEach(function (item) {
            item.CreatedAt = new Date(item.CreatedAt);
        });
    }
    if (deletedArticles) {
        deletedArticles.forEach(function (item) {
            item.CreatedAt = new Date(item.CreatedAt);
        });
    } else{
        deletedArticles = [];
    }
    window.addEventListener('beforeunload', function () {
        if (!Articles) {
            localStorage.setItem('data', JSON.stringify(articles));
            localStorage.setItem('delete', JSON.stringify(deletedArticles));
        } else {
            localStorage.setItem('data', JSON.stringify(Articles));
            localStorage.setItem('delete', JSON.stringify(deletedArticles));
        }
    });

    function setLength() {
        if (Articles) {
            length = Articles.length;
        }
        else {
            length = articles.length;
        }
    }

    var validatedArticle =
        {
            Id: function (id) {
                if (id) {
                    return typeof id === 'string';
                }
                return false;
            },
            Title: function (title) {
                if (title) {
                    return title.length < 100;
                }
                return false;
            },
            Summary: function (summary) {
                if (summary) {
                    return summary.length < 200;
                }
                return false;
            },
            CreatedAt: function (createdAt) {
                return createdAt;
            },
            Author: function (author) {
                return author;
            },
            Content: function (content) {
                return content;
            }
        };

    function getArticles(skip, top, fileConfig) {
        skip = skip || 0;
        top = top || 10;
        var sortedArticles = [];
        if (fileConfig) {
            if (!fileConfig.Author && !fileConfig.CreatedAtStart && !fileConfig.CreatedAtFinish) {
                sortedArticles = Articles.slice(skip, top);
            }
            else if (fileConfig.CreatedAtStart && !fileConfig.CreatedAtFinish && !fileConfig.Author) {
                sortedArticles = Articles.filter(function (number) {
                    return new Date(fileConfig.CreatedAtStart) <= number.CreatedAt;
                });
            }
            else if (!fileConfig.CreatedAtStart && fileConfig.CreatedAtFinish && !fileConfig.Author) {
                sortedArticles = Articles.filter(function (number) {
                    return new Date(fileConfig.CreatedAtFinish) >= number.CreatedAt;
                });
            } else if (fileConfig.CreatedAtStart && fileConfig.CreatedAtFinish && !fileConfig.Author) {
                sortedArticles = Articles.filter(function (number) {
                    return new Date(fileConfig.CreatedAtFinish) >= number.CreatedAt &&
                        new Date(fileConfig.CreatedAtStart) <= number.CreatedAt;
                });
            } else if (fileConfig.CreatedAtStart && fileConfig.CreatedAtFinish && fileConfig.Author) {
                sortedArticles = Articles.filter(function (number) {
                    return new Date(fileConfig.CreatedAtFinish) >= number.CreatedAt &&
                        new Date(fileConfig.CreatedAtStart) <= number.CreatedAt && fileConfig.Author === number.Author;
                });
            } else if (!fileConfig.CreatedAtStart && fileConfig.CreatedAtFinish && fileConfig.Author) {
                sortedArticles = Articles.filter(function (number) {
                    return new Date(fileConfig.CreatedAtFinish) >= number.CreatedAt &&
                        fileConfig.Author === number.Author;
                });
            } else if (fileConfig.CreatedAtStart && !fileConfig.CreatedAtFinish && fileConfig.Author) {
                sortedArticles = Articles.filter(function (number) {
                    return new Date(fileConfig.CreatedAtStart) <= number.CreatedAt && number.Author;
                });
            } else {
                sortedArticles = Articles.filter(function (number) {
                    return fileConfig.Author === number.Author;
                });
            }
        }
        else {
            sortedArticles = Articles.slice(skip, top);
        }
        sortedArticles.sort(function (a, b) {
            return a.CreatedAt - b.CreatedAt;
        });
        return sortedArticles;
    }

    function getArticle(id) {
        var result = false;
        Articles.forEach(function (item) {
            if (id === item.Id) {
                result = item;
            }
        });
        return result || false;
    }

    function validateArticle(article) {
        if (article) {
            return Object.keys(validatedArticle).every(function (item) {
                    return validatedArticle[item](article[item]);
                }
            );
        }
    }

    function addArticle(article) {
        if (validateArticle(article)) {
            Articles.push(article);
            setLength();
            return true;
        }
        else {
            return false;
        }
    }

    function editArticle(id, article) {
        var mainArticle = getArticle(id);
        console.log(mainArticle);
        var bufferArticle = {
            Id: mainArticle.Id,
            Title: article.Title,
            Summary: article.Summary,
            CreatedAt: mainArticle.CreatedAt,
            Author: mainArticle.Author,
            Content: article.Content
        };
        if (validateArticle(bufferArticle)) {
            getArticle(id).Title = article.Title;
            getArticle(id).Summary = article.Summary;
            getArticle(id).Content = article.Content;
            return true;
        }
        else {
            console.log("false");
            return false;
        }
    }

    function removeArticle(id) {
        deletedArticles.push(getArticle(id));
        Articles.splice(Articles.indexOf(getArticle(id)), Articles.indexOf(getArticle(id)));
        setLength();
    }

    function uniqueAuthors() {
        var authors = {};
        Articles.forEach(function (item) {
            var str = item.Author;
            authors[str] = true;
        });
        return authors;
    }

    setLength();

    return {
        getArticles: getArticles,
        getArticle: getArticle,
        validateArticle: validateArticle,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        length: length,
        deletedArticles: deletedArticles,
        uniqueAuthors: uniqueAuthors
    }
}());
var newsService = ((function () {
    var amountOfNews = 0;

    function createNewsForNewsFeed(id) {
        var article = articlesService.getArticle(id);
        var news;
        if (user) {
            news = document.querySelector('#logined-user-news').content.querySelector('.short-news').cloneNode(true);
        } else {
            news = document.querySelector('#unlogined-user-news').content.querySelector('.short-news').cloneNode(true);
        }
        news.id = id;
        news.getElementsByTagName('h2')[0].innerHTML = article.Title;
        news.getElementsByTagName('p')[0].innerHTML = article.Summary;
        news.getElementsByTagName('footer')[0].innerHTML = article.CreatedAt.getDate() + '.' + article.CreatedAt.getMonth() + '.' +
            article.CreatedAt.getFullYear() + ' by ' + article.Author;
        news.addEventListener('click', handleClickOnNews);
        return news;
    }

    function addNewsInNewsFeed(id, direction) {
        var news = createNewsForNewsFeed(id);
        direction.appendChild(news);
        return news;
    }

    function handleClickOnNews(event) {
        var parent = event.target.parentNode;
        if (parent.id === 'edit') {
            editNews(event.currentTarget.id);
        } else {
            if (parent.id === 'delete') {
                deleteNewsFromNewsFeed(event.currentTarget.id);
            } else {
                if (event.currentTarget.className === 'short-news') {
                    openNews(event.currentTarget.id);
                }
            }
        }
    }

    function handleClickToClose(event) {
        var button = event.target;
        if (button.className === 'close-window') {
            closeWindow(event.currentTarget);
        }
        if (button.className === 'login-button') {
            closeWindow(event.currentTarget);
        }
    }

    function handleClickOnEditing(event) {
        var button = event.target;
        if (button.id === 'send-news') {
            completeEditing(event.target.classList, event.currentTarget);
        }
    }

    function handleClickOnCreating(event) {
        var button = event.target;
        if (button.className === 'send-news') {
            createNews(event.currentTarget);
        }
    }

    function handleClickOnNavigationBar(event) {
        var key = event.target.id;
        switch (key) {
            case 'add-news':
                if (user) {
                    createWindowNews();
                }
                break;
        }
    }

    function handleClickOnLogining(event) {
        if (event.target.className === 'login-button') {
            getUser(event.currentTarget);
        }
    }

    function handleClickOnControlButtons(event) {
        switch (event.target.className) {
            case 'sign-in':
                loginWindow();
                break;
            case 'sign-up':
                console.log('sign-up');
                break;
            case 'log-out':
                user = "";
                checkingUser();
                break;
            case 'load-more':
                loadMoreNews();
                break;
        }
    }

    function handleClickOnSort(event) {
        var button = event.currentTarget.childNodes[0];
        var temp = document.getElementsByClassName('sort-tools')[0];
        if (button.className === 'fa fa-arrow-down') {
            temp.style.top = document.getElementsByClassName('header')[0].offsetHeight + 'px';
            button.className = 'fa fa-arrow-up';
        }
        else {
            temp.style.top = '0';
            button.className = 'fa fa-arrow-down';
        }
    }

    function handleClickOnSortButton(event) {
        var body = event.currentTarget.parentNode.parentNode;
        var name = body.getElementsByClassName('authors')[0].value;
        var startDate = body.getElementsByClassName('start-date')[0].value;
        var finishDate = body.getElementsByClassName('finish-date')[0].value;
        var articles = articlesService.getArticles(0, articlesService.length, {
            Author: name,
            CreatedAtStart: startDate,
            CreatedAtFinish: finishDate
        });
        var feed = document.getElementsByClassName('news-feed')[0];
        feed.innerHTML = '';
        articles.forEach(function (item) {
            addNewsInNewsFeed(item.Id, feed);
        });
        document.getElementsByClassName('sort-delete')[0].style.display = 'flex';
        document.getElementsByClassName('load-more')[0].style.display = 'none';
        document.getElementsByClassName('sort-tools')[0].style.top = '0';
        document.getElementsByClassName('fa fa-arrow-up')[0].className = 'fa fa-arrow-down';
    }

    function handleClickOnDeleteSort(event) {
        show();
        event.target.style.display = 'none';
    }

    function loginWindow() {
        var blackBackground = document.createElement('div');
        blackBackground.className = 'half-black';
        var news = document.querySelector('#login-window').content.querySelector('.login-window').cloneNode(true);
        news.id = 'login-window';
        news.addEventListener('click', handleClickToClose);
        news.addEventListener('click', handleClickOnLogining);
        document.getElementsByClassName('overlay')[0].appendChild(news);
        document.getElementsByClassName('overlay')[0].appendChild(blackBackground);
        setTimeout(function () {
            news.style.opacity = '1';
        }, 0);
    }

    function getUser(element) {
        var nickName = element.getElementsByClassName('login')[0].value;
        var password = element.getElementsByClassName('password')[0].value;
        if (nickName) {
            user = nickName;
            checkingUser();
        }
        else {
            alert('Invalid user');
        }
    }

    function createWindowNews() {
        var blackBackground = document.createElement('div');
        blackBackground.className = 'half-black';
        var news = document.querySelector('#creating-news').content.querySelector('.create-news').cloneNode(true);
        news.id = 'creating';
        news.addEventListener('click', handleClickToClose);
        news.addEventListener('click', handleClickOnCreating);
        document.getElementsByClassName('overlay')[0].appendChild(news);
        document.getElementsByClassName('overlay')[0].appendChild(blackBackground);
        setTimeout(function () {
            news.style.opacity = '1';
        }, 0);
    }

    function createNews(element) {
        var title = element.getElementsByClassName('create-news-title')[0].value;
        var summary = element.getElementsByClassName('create-news-summary')[0].value;
        var content = element.getElementsByClassName('create-news-content')[0].value;
        var date = new Date();
        var article = {
            Id: date.toString(),
            Title: title,
            Summary: summary,
            CreatedAt: date,
            Author: user,
            Content: content
        };
        var temp = document.getElementsByClassName('news-feed')[0];
        if (articlesService.validateArticle(article)) {
            articlesService.addArticle(article);
            addNewsInNewsFeed(article.Id, temp);
            closeWindow(element);
            fillingSelect();
        }
        else {
            alert("Invalid news");
        }
    }

    function openNews(id) {
        var blackBackground = document.createElement('div');
        blackBackground.className = 'half-black';
        var news = document.querySelector('#show-news').content.querySelector('.show-news').cloneNode(true);
        var article = articlesService.getArticle(id);
        news.id = 'show-news';
        news.getElementsByTagName('h1')[0].innerHTML = article.Title;
        news.getElementsByTagName('h2')[0].innerHTML = article.Summary;
        news.getElementsByTagName('p')[0].innerHTML = article.Content;
        news.getElementsByTagName('footer')[0].innerHTML = article.CreatedAt.getDate() + '.' + article.CreatedAt.getMonth() + '.' +
            article.CreatedAt.getFullYear() + ' by ' + article.Author;
        news.addEventListener('click', handleClickToClose);
        document.getElementsByClassName('overlay')[0].appendChild(news);
        document.getElementsByClassName('overlay')[0].appendChild(blackBackground);
        setTimeout(function () {
            news.style.opacity = '1';
        }, 0);
    }

    function editNews(id) {
        var article = articlesService.getArticle(id);
        var news = document.querySelector('#edit-news').content.querySelector('.edit-news').cloneNode(true);
        var blackBackground = document.createElement('div');
        blackBackground.className = 'half-black';
        news.id = 'editing';
        news.getElementsByClassName('text-title')[0].value = article.Title;
        news.getElementsByClassName('text-summary')[0].value = article.Summary;
        news.getElementsByClassName('text-content')[0].innerHTML = article.Content;
        news.getElementsByClassName('send-news')[0].id = 'send-news';
        news.getElementsByClassName('send-news')[0].className += ' '+id;
        news.addEventListener('click', handleClickToClose);
        news.addEventListener('click', handleClickOnEditing);
        document.getElementsByClassName('overlay')[0].appendChild(news);
        document.getElementsByClassName('overlay')[0].appendChild(blackBackground);
        setTimeout(function () {
            news.style.opacity = '1';
        }, 0);
    }

    function completeEditing(id, element) {
        var title = element.getElementsByClassName('text-title')[0].value;
        var summary = element.getElementsByClassName('text-summary')[0].value;
        var content = element.getElementsByClassName('text-content')[0].value;
        var article = {
            Title: title,
            Summary: summary,
            Content: content
        };
        if (articlesService.editArticle(id[1], article)) {
            var news = createNewsForNewsFeed(id[1]);
            var oldChild = document.getElementById(id[1]);
            document.getElementsByClassName('news-feed')[0].replaceChild(news, oldChild);
            closeWindow(element);
        } else {
            alert("Invalid news");
        }
    }

    function show() {
        document.getElementsByClassName('news-feed')[0].innerHTML = '';
        var temp = document.getElementsByClassName('news-feed')[0];
        var articles = articlesService.getArticles(0, 4);
        articles.forEach(function (item) {
            addNewsInNewsFeed(item.Id, temp);
        });
        amountOfNews = 4;
        document.getElementsByClassName('load-more')[0].style.display = '';
    }

    function deleteNewsFromNewsFeed(id) {
        var temp = document.getElementById(id);
        articlesService.removeArticle(id);
        temp.parentNode.removeChild(temp);
        console.log(articlesService.deletedArticles);
    }

    function loadMoreNews() {
        if (articlesService.length - amountOfNews > 0) {
            var temp = document.getElementsByClassName('news-feed')[0];
            var articles = articlesService.getArticles(amountOfNews, amountOfNews + 4);
            articles.forEach(function (item) {
                addNewsInNewsFeed(item.Id, temp);
            });
            amountOfNews += 4;
            if (articlesService.length - amountOfNews < 0) {
                document.getElementsByClassName('load-more')[0].style.display = 'none';
            }
        }
    }

    function closeWindow(element) {
        element.style.opacity = '0';
        setTimeout(function () {
            document.getElementsByClassName('overlay')[0].removeChild(element);
            var temp = document.getElementsByClassName('half-black')[0];
            document.getElementsByClassName('overlay')[0].removeChild(temp);
        }, 500);
    }

    function fillingSelect() {
        var authors = articlesService.uniqueAuthors();
        var select = document.getElementsByClassName('authors')[0];
        select.innerHTML = '';
        Object.keys(authors).forEach(function (item) {
            select.innerHTML += '<option>' + item + '</option>';
        });
        select.innerHTML += '<option> </option>'
    }

    fillingSelect();

    document.getElementsByClassName('sort-delete')[0].addEventListener('click', handleClickOnDeleteSort);

    document.getElementsByClassName('navigation-bar')[0].addEventListener('click', handleClickOnNavigationBar);

    document.getElementsByClassName('sort-triggering')[0].addEventListener('click', handleClickOnSort);

    document.getElementsByClassName('all-buttons')[0].addEventListener('click', handleClickOnControlButtons);

    document.getElementsByClassName('load-more')[0].addEventListener('click', handleClickOnControlButtons);

    document.getElementsByClassName('sort-button')[0].addEventListener('click', handleClickOnSortButton);

    function checkingUser() {
        if (user) {
            document.getElementsByClassName('sign-in')[0].style.display = 'none';
            document.getElementsByClassName('sign-up')[0].style.display = 'none';
            document.getElementsByClassName('nickname')[0].textContent = user;
            document.getElementsByClassName('nickname')[0].style.display = '';
            document.getElementsByClassName('log-out')[0].style.display = '';
            document.getElementsByClassName('link-white')[0].style.display = '';
            show();
        } else {
            document.getElementsByClassName('link-white')[0].style.display = 'none';
            document.getElementsByClassName('log-out')[0].style.display = 'none';
            document.getElementsByClassName('nickname')[0].style.display = 'none';
            document.getElementsByClassName('nickname')[0].textContent = '';
            document.getElementsByClassName('sign-in')[0].style.display = '';
            document.getElementsByClassName('sign-up')[0].style.display = '';
            show();
        }
    }

    checkingUser();

    return {
        addNews: addNewsInNewsFeed,
        deleteNews: deleteNewsFromNewsFeed,
        show: show,
        changeNews: editNews,
        closeWindow: closeWindow,
        completeChanging: completeEditing
    }
})());
window.onload = function () {
    newsService.show();
};