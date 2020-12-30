function fetchGitHubInformation(event) {
    let username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h4>Please enter a GitHub username</h4>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
    <img src="assets/css/loader.gif" alt = "loading ..."/></div>`
    );
    $.when(
        $.getJSON("https://api.github.com/users/${username}")
    ).then(
        function (response) {
            let userData = response;
            $("#gh-user-data").html(userinformationHTML(userData));
        },
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<h2>${errorResponse.responseJSON.message}</h2>`);
            }
        })
}