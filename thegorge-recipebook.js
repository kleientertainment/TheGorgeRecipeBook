/* eslint-env jquery, browser */

var recipe_count = 70;
var discovered_count = 0;

var discovered_dishes = {};

var craving_names = {
    "snack": "Snack",
    "soup": "Soup",
    "veggie": "Veggie",
    "fish": "Fish",
    "bread": "Bread",
    "meat": "Meat",
    "cheese": "Cheese",
    "pasta": "Pasta",
    "sweet": "Dessert"
}

var coin_names = ["Old Coin", "Sapphire Medallion", "Red Mark", "Gnaw's Favor"];

var cooking_station_names = {
    "pot": "Cookpot",
    "oven": "Oven",
    "grill": "Grill"
}

var ingredient_names = {
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
    "quagmire_spotspice_ground": "Spot Spice"
}

$(document).ready(function () {

    GetDishes();

    $(document).on("click", ".recipelist-dishes li.dish", function (event) {
        event.preventDefault();
        SelectDish(this);
    });

});

function GetDishes() {
    $.ajax({
        type: 'GET',
        url: "https://s3.amazonaws.com/kleiforums/GORGE/RecipeBook/recipedata.json",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function (data) {
            if (data) {
                discovered_dishes = data;
                FillList();
            }
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
            FillList();
        }
    });
}

function FillList() {
    var recipe_container_elem = $(".recipelist-dishes");

    for (var i = 1; i <= recipe_count; i++) {
        var dish = document.createElement("li");
        $(dish).addClass("dish");
        $(dish).attr("dish", i);
        $(dish).attr("data-index", i);
        $(dish).append("<span class='dish-number'>" + DishNumber(i) + "</span>");
        $(dish).append("<span class='dish-plating'></span>");
        if (discovered_dishes[i] != null) {
            $(dish).addClass("discovered");
            discovered_count++;
            let name = discovered_dishes[i].name;
            if (typeof loc_string == 'function') name = loc_string("dish" + i);
            $(dish).attr("title", name);
            $(dish).attr("i18n-title", "dish" + i);
            $(dish).addClass(discovered_dishes[i].dish);
            if (i == 70) $(dish).addClass("syrup");
            $(dish).append("<span class='dish-icon' style='background-image: url(" + discovered_dishes[i].image + ");'></span>");
        } else {
            $(dish).attr("title", "Unknown");
            $(dish).append("<span class='dish-icon'></span>");
        }

        var dish_icon_container = document.createElement("div");
        $(dish_icon_container).addClass("icon-container");
        $(dish_icon_container).appendTo($(dish));

        var tribute_icon = "";
        var tribute_icon_class = "";
        var tribute_icon_title = "";
        if (discovered_dishes[i] != null) {
            for (var coin_index = 3; coin_index >= 0; coin_index--) {
                if (discovered_dishes[i].coins[coin_index] > 0) {
                    tribute_icon = "coin" + (coin_index + 1);
                    tribute_icon_class = "coin" + (coin_index + 1) + " visible";
                    tribute_icon_title = coin_names[coin_index];
                    break;
                }
            }
        }
        $(dish_icon_container).append("<span class='tribute-icon " + tribute_icon_class + "' title='" + tribute_icon_title + "' i18n-title='" + tribute_icon + "'></span>");

        var plating_icon = "";
        var plating_icon_class = "";
        var plating_icon_title = "";
        if (discovered_dishes[i] != null) {
            for (var coin_index = 3; coin_index >= 0; coin_index--) {
                if (discovered_dishes[i].silver_coins[coin_index] > 0) {
                    plating_icon = "coin" + (coin_index + 1);
                    plating_icon_class = "coin" + (coin_index + 1) + " visible";
                    plating_icon_title = coin_names[coin_index];
                    break;
                }
            }
        }
        $(dish_icon_container).append("<span class='plating-tribute-icon " + plating_icon_class + "' title='" + plating_icon_title + "' i18n-title='" + plating_icon + "'></span>");

        var stations_html = "";
        if (discovered_dishes[i] != null) {
            for (var station_index = 0; station_index < discovered_dishes[i].station.length; station_index++) {
                stations_html += "<span class='" + discovered_dishes[i].station[station_index] + "' title='" + cooking_station_names[discovered_dishes[i].station[station_index]] + "' i18n-title='" + discovered_dishes[i].station[station_index] + "'></span>";
            }
        }
        $(dish_icon_container).append("<span class='cooking-station-icon'>" + stations_html + "</span>");

        if (discovered_dishes[i] != null) {
            var dish_size_class = (discovered_dishes[i].ingredients[0].length == 4) ? "large-dish" : "small-dish";
            $(dish).addClass(dish_size_class);
        }

        $(dish).appendTo($(recipe_container_elem));

        if (i == 35) $(recipe_container_elem).append("<br/>");
    }

    $(".recipebook-header-count").text("Discovered Recipes: " + discovered_count + "/" + recipe_count);

    if (typeof GorgeFilterDishes == 'function') GorgeFilterDishes();
    if (typeof GorgeRecipebookLocalize == 'function') GorgeRecipebookLocalize();
}

function DishNumber(number) {
    if (number == 70) return "**";
    return (number < 10) ? "0" + number : number;
}

function OrdinalNumber(number) {
    return number + "<span class='ordinal'>" + OrdinalSuffix(number) + "</span>"
}

function OrdinalSuffix(number) {
    var ordinal = "";
    var last_digit = number.toString().slice(-1);
    switch (last_digit) {
        case '1':
            ordinal = 'st';
            break;
        case '2':
            ordinal = 'nd';
            break;
        case '3':
            ordinal = 'rd';
            break;
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            ordinal = 'th';
            break;
    }
    return ordinal;
}

function SelectDish(dish_elem) {
    // Unselect other dishes
    $(".recipelist-dishes li.dish.selected").removeClass("selected");

    // Set these classes to the corresponding icon on the details panel
    var icon_classes = $(dish_elem).attr("class");
    $(".recipedetails .dish").attr("class", icon_classes);

    // Select this dish
    $(dish_elem).addClass("selected");

    // Set the dish number
    var index = parseInt($(dish_elem).attr("data-index"));
    $(".recipedetails .dish-number").text(DishNumber(index));

    // Set the dish icon
    var img = $(dish_elem).find(".dish-icon").attr("style");
    $(".recipedetails .dish-icon").attr("style", img);

    // Get dish data
    var dish_data = discovered_dishes[index];
    if (dish_data) {
        // This dish has been discovered!
        $(".recipedetails").removeClass("unknown");
        let name = dish_data.name;
        if (typeof loc_string == 'function') name = loc_string("dish" + index);
        $(".recipedetails .dish-name").text(name);

        // Check its tribute value
        $(".recipedetails .dish .tribute-icon").attr("class", "tribute-icon");
        var first = true;
        var empty = true;
        for (var coin_index = 0; coin_index < 4; coin_index++) {
            if (discovered_dishes[index].coins[coin_index] > 0) {
                $(".recipedetails .dish-tribute .coin" + (coin_index + 1)).addClass("visible");
                $(".recipedetails .dish-tribute .coin" + (coin_index + 1) + " .value").text(discovered_dishes[index].coins[coin_index]);
                if (first) {
                    $(".recipedetails .dish .tribute-icon").addClass("coin" + (coin_index + 1) + " visible");
                    let title = coin_names[coin_index];
                    if (typeof loc_string == 'function') title = loc_string("coin" + (coin_index + 1));
                    $(".recipedetails .dish .tribute-icon").attr("title", title);
                    $(".recipedetails .dish .tribute-icon").attr("i18n-title", "coin" + (coin_index + 1));
                    first = false;
                }
                empty = false;
            } else {
                $(".recipedetails .dish-tribute .coin" + (coin_index + 1)).removeClass("visible");
            }
        }
        $(".recipedetails .dish-tribute .empty").text((index == 70) ? "None" : "Unknown");
        if (empty) {
            $(".recipedetails .dish-tribute .empty").show();
        } else {
            $(".recipedetails .dish-tribute .empty").hide();
        }

        // Check its plate tribute value
        $(".recipedetails .dish .plating-tribute-icon").attr("class", "plating-tribute-icon");
        first = true;
        empty = true;
        for (var coin_index = 3; coin_index >= 0; coin_index--) {
            if (discovered_dishes[index].silver_coins[coin_index] > 0) {
                $(".recipedetails .dish-plate .coin" + (coin_index + 1)).addClass("visible");
                $(".recipedetails .dish-plate .coin" + (coin_index + 1) + " .value").text(discovered_dishes[index].silver_coins[coin_index]);
                if (first) {
                    $(".recipedetails .dish .plating-tribute-icon").addClass("coin" + (coin_index + 1) + " visible");
                    let title = coin_names[coin_index];
                    if (typeof loc_string == 'function') title = loc_string("coin" + (coin_index + 1));
                    $(".recipedetails .dish .plating-tribute-icon").attr("title", title);
                    $(".recipedetails .dish .plating-tribute-icon").attr("i18n-title", "coin" + (coin_index + 1));
                    first = false;
                }
                empty = false;
            } else {
                $(".recipedetails .dish-plate .coin" + (coin_index + 1)).removeClass("visible");
            }
        }
        $(".recipedetails .dish-plate .empty").text((index == 70) ? "None" : "Unknown");
        if (empty) {
            $(".recipedetails .dish-plate .empty").show();
        } else {
            $(".recipedetails .dish-plate .empty").hide();
        }

        // Check its cravings info
        var cravings_text = "";
        if (discovered_dishes[index].cravings) {
            for (var craving_index = 0; craving_index < discovered_dishes[index].cravings.length; craving_index++) {
                cravings_text += "<span i18n-text='" + discovered_dishes[index].cravings[craving_index] + "'>" + craving_names[discovered_dishes[index].cravings[craving_index]] + "</span>, ";
            }
        }
        if (cravings_text.length == 0) {
            cravings_text = (index == 70) ? "None" : "Unknown";
        } else {
            cravings_text = cravings_text.substring(0, cravings_text.length - 2);
        }
        $(".recipedetails .dish-craving .value").html(cravings_text);

        // Check its cooking stations
        var stations_text = "";
        for (var station_index = 0; station_index < discovered_dishes[index].station.length; station_index++) {
            stations_text += cooking_station_names[discovered_dishes[index].station[station_index]] + ", ";
        }
        stations_text = stations_text.substring(0, stations_text.length - 2);
        $(".recipedetails .dish-station .value").text(stations_text);
        $(".recipedetails .dish .cooking-station-icon").text("");
        $(".recipedetails .dish .cooking-station-icon").append($(dish_elem).find(".cooking-station-icon").html());

        // List this dish's most popular recipes
        $(".recipedetails .dish-recipes .dish-attribute-content").text("");
        for (var recipe_index = 0; recipe_index < discovered_dishes[index].ingredients.length; recipe_index++) {
            var recipe = discovered_dishes[index].ingredients[recipe_index];
            var recipe_html = "<div class='dish-recipe'>";
            var recipe_pos = (recipe_index > 0) ? (recipe_index + 1) + OrdinalSuffix(recipe_index + 1) + " " : "";
            recipe_html += "<span class='rank-pos' title='This is the " + recipe_pos + "most popular way to cook this dish.'>" + OrdinalNumber(recipe_index + 1) + "</span>";
            // Go through the ingredients
            for (var ingredient_index = 0; ingredient_index < recipe.length; ingredient_index++) {
                let name = ingredient_names[recipe[ingredient_index]];
                if (typeof loc_string == 'function') name = loc_string(recipe[ingredient_index]);
                recipe_html += "<span class='ingredient " + recipe[ingredient_index] + "' title='" + name + "' i18n-title='" + recipe[ingredient_index] + "'></span>";
            }
            recipe_html += "</div>";
            $(".recipedetails .dish-recipes .dish-attribute-content").append(recipe_html);
        }

        $(".recipedetails .dish-finder .value").text("");
        if (discovered_dishes[index].finder) {
            for (var finder_index = 0; finder_index < discovered_dishes[index].finder.length; finder_index++) {
                var finder_username = discovered_dishes[index].finder[finder_index];
                if (finder_username.length > 1) {
                    let title = "This recipe was originally discovered by %1";
                    if (typeof loc_string == 'function') title = loc_string('label_cook_info');
                    title = title.replace("%1", finder_username);
                    $(".recipedetails .dish-finder .value").append("<span title='" + title + "' i18n-title='label_cook_info' i18n-argument='" + finder_username + "'>" + finder_username + "</span>");
                } else {
                    $(".recipedetails .dish-finder .value").append("<span title='This recipe was originally discovered by a nameless someone.'>Someone</span>");
                }
            }
        } else {
            let title = "This recipe was originally discovered by a nameless someone.";
            let name = "Someone";
            if (typeof loc_string == 'function') {
                title = loc_string('label_cook_info_unknown');
                name = loc_string('label_cook_unknown');
            };
            $(".recipedetails .dish-finder .value").append("<span title='" + title + "' i18n-title='label_cook_info_unknown' i18n-text='label_cook_unknown'>" + name + "</span>");
        }

        var dish_size_class = (discovered_dishes[index].ingredients[0].length == 4) ? "large-dish" : "small-dish";
        $(dish_elem).addClass(dish_size_class);

    } else {
        // This dish hasn't been discovered yet!
        $(".recipedetails").addClass("unknown");
        $(".recipedetails .dish-name").text("Unknown");

        $(".recipedetails .dish").attr("class", "dish");
        $(".recipedetails .dish-icon").attr("style", "");
        $(".recipedetails .tribute-icon").attr("class", "tribute-icon");
        $(".recipedetails .plating-tribute-icon").attr("class", "plating-tribute-icon");
        $(".recipedetails .cooking-station-icon").text("");
        $(".recipedetails .dish-finder .value").text("");

    }
}
