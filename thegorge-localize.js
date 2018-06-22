var loc_strings = {
    "English": {
        "label_offering":"Offering",
        "label_silveroffering":"Silver Dish Offering",
        "label_craving":"Satisfies Craving",
        "label_stations":"Cooking Stations",
        "label_recipes":"Top Recipes",
        "label_cook":"First Cooked By",
        "label_cook_unknown":"Someone",
        "label_cook_info":"This recipe was originally discovered by ",
        "label_cook_info_unknown":"This recipe was originally discovered by a nameless someone.",
        
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

        "coin1": "Old Coin",
        "coin2": "Sapphire Medallion",
        "coin3": "Red Mark",
        "coin4": "Gnaw's Favor",

        "quagmire_foliage_cooked": "Foliage",
        "quagmire_onion_cooked": "Onion",
        "quagmire_carrot_cooked": "Carrot",
        "quagmire_mushrooms_cooked": "Mushroom",
        "quagmire_crabmeat_cooked": "Crab Meat",
        "quagmire_potato_cooked": "Potato",
        "quagmire_salmon_cooked": "Salmon",
        "quagmire_cookedsmallmeat": "Meat Scraps",
        "twigs": "Twigs",
        "quagmire_turnip_cooked": "Turnip",
        "quagmire_sap": "Sap",
        "rocks": "Rocks",
        "quagmire_goatmilk": "Goat Milk",
        "quagmire_syrup": "Syrup",
        "quagmire_flour": "Flour",
        "quagmire_garlic_cooked": "Garlic",
        "berries_cooked": "Berries",
        "cookedmeat": "Meat",
        "quagmire_tomato_cooked": "Toma Root",
        "quagmire_spotspice_ground": "Spot Spice",

        "dish1": "bread",
        "dish2": "chips",
        "dish3": "veggie_soup",
        "dish4": "jelly_sandwich",
        "dish5": "fish_stew",
        "dish6": "turnip_cake",
        "dish7": "potato_pancakes",
        "dish8": "potato_soup",
        "dish9": "fishball_skewers",
        "dish10": "meatballs",
        "dish11": "meat_skewers",
        "dish12": "stone_soup",
        "dish13": "croquette",
        "dish14": "roasted_veggies",
        "dish15": "meatloaf",
        "dish16": "carrot_soup",
        "dish17": "fish_pie",
        "dish18": "fish_and_chips",
        "dish19": "meat_pie",
        "dish20": "slider",
        "dish21": "jam",
        "dish22": "jelly_roll",
        "dish23": "carrot_cake",
        "dish24": "mashed_potatoes",
        "dish25": "garlic_bread",
        "dish26": "tomato_soup",
        "dish27": "sausage",
        "dish28": "candied_fish",
        "dish29": "stuffed_mushroom",
        "dish30": "ratatouille",
        "dish31": "bruschetta",
        "dish32": "meat_stew",
        "dish33": "hamburger",
        "dish34": "fish_burger",
        "dish35": "mushroom_burger",
        "dish36": "fish_steak",
        "dish37": "curry",
        "dish38": "spaghetti_and_meatballs",
        "dish39": "lasagna",
        "dish40": "poached_fish",
        "dish41": "shepherds_pie",
        "dish42": "candy",
        "dish43": "pudding",
        "dish44": "waffles",
        "dish45": "berry_tart",
        "dish46": "mac_n_cheese",
        "dish47": "bagel_n_fish",
        "dish48": "grilled_cheese",
        "dish49": "cream_of_mushroom",
        "dish50": "pierogies",
        "dish51": "manicotti",
        "dish52": "cheeseburger",
        "dish53": "fettuccine",
        "dish54": "onion_soup",
        "dish55": "breaded_cutlet",
        "dish56": "creamy_fish",
        "dish57": "pizza",
        "dish58": "pot_roast",
        "dish59": "crab_cake",
        "dish60": "steak_frites",
        "dish61": "shooter_sandwich",
        "dish62": "bacon_wrapped_meat",
        "dish63": "crab_roll",
        "dish64": "meat_wellington",
        "dish65": "crab_ravioli",
        "dish66": "caramel_cube",
        "dish67": "scone",
        "dish68": "trifle",
        "dish69": "cheesecake",
        "dish70": "quagmire_syrup"
    },
    "繁": {
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
        "sweet": "甜品(Dessert)"
    },
    "简": {
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
        "sweet": "甜品(Dessert)"
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
    return loc_strings[loc_selected_language][key] ||
        loc_strings["English"][key] || "Invalid String";
}
