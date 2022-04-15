export const loadMapApi = () => { //Hints from https://storksnestblog.wordpress.com/2020/08/16/setting-up-google-maps-with-react-typescript/
    const mapsURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBQl5Nr7R5cNrPDLDf_ufwXup0V0znF7lM&libraries=geometry,places&language=no&region=NO&v=quarterly`;
    const scripts = document.getElementsByTagName('script');
    // Go through existing script tags, and return google maps api tag when found.
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf(mapsURL) === 0) {
            return scripts[i];
        }
    }
// adding it to DOM
    const googleMapScript = document.createElement('script');
    googleMapScript.src = mapsURL;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);

    return googleMapScript;
};