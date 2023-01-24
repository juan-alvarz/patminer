export function QueryStringPart() {
  var query = window.location.search.substring(1);
  query = unescape(query);
  var pairs = query.split("&");
  for (var i = 0; i < pairs.length; i++) {
    var pos = pairs[i].indexOf("=");
    if (pos >= 0) {
      var argname = pairs[i].substring(0, pos);
      if (argname == "part") {
        var value = pairs[i].substring(pos + 1);
        return value;
      }
    }
  }
  return "";
}

export function getWebLink(partSearch) {
  document.getElementById("iFrame").src = `https://www.icsource.com/icsourcewdl/icswdl2.aspx?user=partmine&part=${partSearch}` +
    QueryStringPart();
}
