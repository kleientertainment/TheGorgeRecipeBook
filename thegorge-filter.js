// wait Until Loading Complete
function GorgeFilterDishes() {
    let options = {
        discovered_dishes: discovered_dishes,
        dishDisplayModeDefault: "dish-display-mode-opacity"
    };
    main(options);

    // Add credits! Thank you both!
    $("#recipebook").after('<div class="recipebook-credits">Craving and Cooking Station filtering done by <a href="https://forums.kleientertainment.com/profile/1125024-cheewind/">cheewind</a> and <a href="https://forums.kleientertainment.com/profile/988803-adai1198/">adai1198</a>!<br>Traditional and Simplified Chinese by <a href="https://forums.kleientertainment.com/profile/1125024-cheewind/">cheewind</a> and <a href="https://forums.kleientertainment.com/profile/793873-xyangy87/">Xheepey87</a>. Russian by <a href="https://github.com/FBNikita">FBNikita</a>, <a href="https://github.com/SkyFly97">SkyFly97</a>, <a href="https://github.com/TiMKroyer">TiMKroyer</a>, and <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1240565842&tscn=1529691187">RLP-team</a>. Brazilian Portuguese by <a href="https://forums.kleientertainment.com/profile/978076-kynoox_/">Kynoox_</a>.<br>Want to add your own language? Submit a request on <a href="https://github.com/kleientertainment/TheGorgeRecipeBook">git</a>.</div>');
}

// this is the code which will be injected into a given page...
function main(options) {
    // options
    let dishDisplayModeDefault = options.dishDisplayModeDefault;
    let discovered_dishes = options.discovered_dishes;
    // translate
    //let translateToUserLanguage = text => browser.i18n.getMessage(text);
    //let t = translateToUserLanguage;

    /////////////////////////////////////////////

    const stations = ["pot", "oven", "grill"];
    let btn_station_div = $('<div/>', {
        class: 'btn_station_div'
    });
    for (let station of stations) {
        let label = document.createElement("label");
        label.setAttribute('class', "button");
        label.setAttribute('for', station);
        label.innerText = loc_string(station);
        let checkbox = document.createElement("input");
        checkbox.setAttribute('id', station);
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('class', 'invisible');
        checkbox.classList.add('station_btn');
        btn_station_div.append(checkbox);
        btn_station_div.append(label);
    }

    const categories = [
        "all", "snack", "bread", "veggie", "soup",
        "fish", "meat", "cheese", "pasta", "sweet"
    ];
    let btn_cat_div = $('<div/>', {
        class: 'btn_cat_div'
    });
    for (let category of categories) {
        let label = document.createElement("label");
        label.setAttribute('class', "button");
        label.setAttribute('for', category);
        label.innerText = loc_string(category);
        let radio = document.createElement("input");
        radio.setAttribute('id', category);
        radio.setAttribute('type', 'radio');
        radio.setAttribute('class', 'invisible');
        radio.classList.add('cat_btn');
        radio.setAttribute('name', 'category');
        if (category == 'all') radio.checked = true; // default
        btn_cat_div.append(radio);
        btn_cat_div.append(label);
    }

    let div_all_btns = $('<div id="filter-button"/>');
    div_all_btns.append(btn_cat_div);
    div_all_btns.append(btn_station_div);
    $('.recipelist').prepend(div_all_btns);

    ////////////////////////////////////////////

    // no br element
    // $('.recipelist-dishes > br').remove(); // the br is necessary to show two rows on mobile

    //
    let lastClickDish = 0;
    let lastHighLight = 0;

    let dishElement = $('.recipelist-dishes > li');

    let currentCategory = 'all';
    let currentStationStatus = {
        pot: false,
        oven: false,
        grill: false
    }
    $('.station_btn').on('change', e => {
        currentStationStatus[e.target.id] = e.target.checked;
        highlight();
        // relocateClickDish
        if (dishElement.eq(lastClickDish).hasClass('lowpoint'))
            $('.recipelist-dishes > li:not(.lowpoint)').first()[0].click();
    });
    $('.cat_btn').on('change', e => {
        currentCategory = e.target.id;
        highlight();
        // relocateClickDish
        if (dishElement.eq(lastClickDish).hasClass('lowpoint'))
            $('.recipelist-dishes > li:not(.lowpoint)').first()[0].click();
    });

    $('.recipelist-dishes > li,\
	.recipelist-dishes > li > icon-container > *').click(e => {
        let index = Number.parseInt(e.target.getAttribute("dish") ||
            e.target.parentElement.getAttribute("dish") ||
            e.target.parentElement.parentElement.getAttribute("dish") ||
            e.target.parentElement.parentElement.parentElement
            .getAttribute("dish")) - 1;
        if (!isNaN(index)) {
            if (dishElement.eq(index).hasClass('lowpoint'))
                return;
            dishElement.eq(lastHighLight).removeClass('selected');
            dishElement.eq(index).addClass('selected');
            SelectDish(dishElement[index]);
            lastHighLight = lastClickDish = index;
        }
    });
    $('.recipelist-dishes > li,\
	.recipelist-dishes > li > icon-container > *').hover(e => {
        let index = Number.parseInt(e.target.getAttribute("dish") ||
            e.target.parentElement.getAttribute("dish") ||
            e.target.parentElement.parentElement.getAttribute("dish") ||
            e.target.parentElement.parentElement.parentElement
            .getAttribute("dish")) - 1;
        if (!isNaN(index)) {
            if (dishElement.eq(index).hasClass('lowpoint'))
                return;
            dishElement.eq(lastHighLight).removeClass('selected');
            dishElement.eq(index).addClass('selected');
            lastHighLight = index;
            SelectDish(dishElement[index]);
        }
    }, e => {
        dishElement.eq(lastHighLight).removeClass('selected');
        dishElement.eq(lastClickDish).addClass('selected');
        lastHighLight = lastClickDish;
        SelectDish(dishElement[lastClickDish]);
    });

    // default
    dishElement[lastClickDish].childNodes[0].click();

    function highlight() {
        for (let id = 1; id <= 70; ++id) {
            let dish = $(".recipelist-dishes .dish[data-index=" + id + "]");
            
            let currentStationAll = !currentStationStatus.pot &&
                !currentStationStatus.oven && !currentStationStatus.grill;

            // normal dish
            let needHighlight = (
                    (discovered_dishes[id].cravings != null && (currentCategory == 'all' || discovered_dishes[id].cravings.indexOf(currentCategory) != -1))
                    &&
                    (currentStationAll || discovered_dishes[id].station.some(dishStations => currentStationStatus[dishStations])))
                // dish 70
                ||
                (discovered_dishes[id].cravings == null && currentStationAll && currentCategory == 'all');

            if (dishDisplayModeDefault) {
                if (needHighlight)
                    $(dish).removeClass('lowpoint').removeClass('translucent');
                else $(dish).addClass('lowpoint').addClass('translucent');
            } else {
                if (needHighlight)
                    $(dish).removeClass('lowpoint').removeClass('invisible');
                else $(dish).addClass('lowpoint').addClass('invisible');
            }
        }
    }
}
