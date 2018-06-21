var loc_strings = {
    "English": {
        "TheGorgeRecipeFilter": "The Gorge Recipe Filter",
        "pot": "Cookpot",
        "oven": "Oven",
        "grill": "Grill",
        "all": "All",
        "snack": "Snack",
        "bread": "Bread",
        "veggie": "Veggie",
        "soup": "Soup",
        "fish": "Fish",
        "meat": "Meat",
        "cheese": "Cheese",
        "pasta": "Pasta",
        "sweet": "Dessert",
        "DishDisplayMode": "Dish Display Mode",
        "OpaqueAndTranslucent": "Opaque and Translucent",
        "AvailableDishOnly": "Available dish only"
    },
    "繁": {
        "TheGorgeRecipeFilter": "Gorge 食譜篩選器",
        "pot": "烹煮鍋(Cookpot)",
        "oven": "窯烤爐(Oven)",
        "grill": "燒烤盤(Grill)",
        "all": "全部(All)",
        "snack": "點心(Snack)",
        "bread": "麵包(Bread)",
        "veggie": "蔬菜(Veggie)",
        "soup": "湯(Soup)",
        "fish": "魚(Fish)",
        "meat": "肉(Meat)",
        "cheese": "起司(Cheese)",
        "pasta": "義大利麵(Pasta)",
        "sweet": "甜品(Dessert)",
        "DishDisplayMode": "料理顯示模式",
        "OpaqueAndTranslucent": "不透明/半透明顯示",
        "AvailableDishOnly": "僅顯示有效料理"
    },
    "简": {
        "TheGorgeRecipeFilter": "Gorge 食谱筛选器",
        "pot": "烹煮鍋(Cookpot)",
        "oven": "窑烤炉(Oven)",
        "grill": "烧烤盘(Grill)",
        "all": "全部(All)",
        "snack": "点心(Snack)",
        "bread": "面包(Bread)",
        "veggie": "蔬菜(Veggie)",
        "soup": "汤(Soup)",
        "fish": "魚(Fish)",
        "meat": "肉(Meat)",
        "cheese": "起司(Cheese)",
        "pasta": "意大利面(Pasta)",
        "sweet": "甜品(Dessert)",
        "DishDisplayMode": "料理显示模式",
        "OpaqueAndTranslucent": "不透明/半透明显示",
        "AvailableDishOnly": "仅显示有效料理"
    }
}

var loc_selected_language = "English";

function GorgeRecipebookLocalize() {

    // Add language buttons
    var btn_language_div = document.createElement("div");
    $(btn_language_div).attr('class', 'btn_language_div');
    for (var language in loc_strings) {
        let button = document.createElement("div");
        $(button).attr('class', "button language_btn");
        $(button).attr('for', language);
        $(button).text(language);
        $(btn_language_div).append(button);
    }
    $('.recipelist').append(btn_language_div);

    // Look for a cookie
    var language = loc_get_cookie("language");
    if (language != null && loc_strings[language] != null) loc_set_language(language);

    // Select the corresponding button
    $(".language_btn[for='" + loc_selected_language + "']").addClass("selected");

    // Setup button listener
    $('.language_btn').on('click', e => {
        // Unselect others
        $('.language_btn').removeClass('selected');

        $(e.target).addClass('selected');

        loc_set_language($(e.target).attr("for"));
    });
}

function loc_set_language(language_key) {
    loc_selected_language = language_key;

    // Update cravings
    var craving_elems = $('.btn_cat_div label.button');
    for (var i = 0; i < craving_elems.length; i++) {
        $(craving_elems[i]).text(loc_string($(craving_elems[i]).attr('for')));
    }

    // Update stations
    var station_elems = $('.btn_station_div label.button');
    for (var i = 0; i < station_elems.length; i++) {
        $(station_elems[i]).text(loc_string($(station_elems[i]).attr('for')));
    }

    // Set a cookie
    loc_set_cookie("language", loc_selected_language, 6);
}

function loc_set_cookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function loc_get_cookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function loc_string(key) {
    return loc_strings[loc_selected_language][key] || "Invalid String";
}
