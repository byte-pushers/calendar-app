module.exports = function(config){
    config.set({
        basePath : '../../../',

        files : [
            'src/main/webapp/lib/angular/angular.js',
            'src/main/webapp/lib/angular/angular-*.js',
            'src/main/webapp/lib/jquery/jquery-1.7.2.js',
            'src/main/webapp/js/com.noesiscode.extentions.ArrayExtention.js',
            'src/main/webapp/js/com.noesiscode.extentions.JQueryExtention.js',
            'src/main/webapp/js/com.noesiscode.extentions.ObjectExtention.js',
            'src/main/webapp/js/com.noesiscode.extentions.StringExtention.js',
            'src/main/webapp/js/com.noesiscode.extentions.DateExtention.js',
            'src/main/webapp/js/com.noesiscode.js',
            'src/main/webapp/js/com.noesiscode.extentions.Console.js',
            'src/main/webapp/js/com.noesiscode.exceptions.Errors.js',
            'src/main/webapp/js/com.noesiscode.utils.NumberUtility.js',
            'src/main/webapp/js/com.noesiscode.utils.converters.date.DateConverter.js',
            'src/main/webapp/js/com.noesiscode.models.Person.js',
            'src/main/webapp/js/com.noesiscode.calendar.CalendarAPI.js',
            'src/main/webapp/js/com.noesiscode.calendar.utils.MonthUtility.js',
            'src/main/webapp/js/com.noesiscode.calendar.models.exceptions.Errors.js',
            'src/main/webapp/js/com.noesiscode.calendar.models.Event.js',
            'src/main/webapp/js/com.noesiscode.calendar.models.EventTransformer.js',
            'src/main/webapp/js/com.noesiscode.calendar.models.Day.js',
            'src/main/webapp/js/com.noesiscode.calendar.models.Week.js',
            'src/main/webapp/js/com.noesiscode.calendar.models.Month.js',
            'src/main/webapp/js/angular/com.noesiscode.calendar.app.js',
            'src/main/webapp/js/angular/com.noesiscode.calendar.controllers.js',
            'src/main/webapp/js/angular/com.noesiscode.calendar.controllers.LoginController.js',
            'src/main/webapp/js/angular/com.noesiscode.calendar.directives.js',
            'src/main/webapp/js/angular/com.noesiscode.calendar.services.js',
            'src/main/webapp/js/angular/com.noesiscode.oauth.models.OAuth2Context.js',
            'src/main/webapp/js/angular/com.noesiscode.oauth.models.OAuth2TokenInfo.js',
            'src/main/webapp/js/angular/com.noesiscode.oauth.models.OAuth2TokenValidationResponseInfo.js',
            'src/main/webapp/js/angular/com.noesiscode.oauth.OAuthStrategy.js',
            'src/main/webapp/js/angular/com.noesiscode.oauth.OAuth2Strategy.js',
            'src/test/lib/angular/angular-mocks.js',
            'src/test/unit/Tester.js',
            'src/test/unit/jasmine/TesterSpec.js',
            'src/test/unit/jasmine/DateConverterSpec.js',
            'src/test/unit/jasmine/NumberUtilitySpec.js',
            'src/test/unit/jasmine/NameSpaceSpec.js',
            'src/test/unit/jasmine/ArraySpec.js',
            'src/test/unit/jasmine/EventSpec.js',
            'src/test/unit/jasmine/PersonSpec.js',
            'src/test/unit/jasmine/CalendarSpec.js',
            'src/test/unit/jasmine/MonthUtilitySpec.js',
            'src/test/unit/jasmine/SuperClassMethodSpec.js',
            'src/test/unit/jasmine/angular/LoginServiceSpec.js'
        ],

        // list of files to exclude
        exclude: ['src/main/webapp/lib/angular/angular-*.min.js'],

        autoWatch : false,

        frameworks: ['jasmine'],

        browsers : ['Chrome','Firefox'],

        plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    })}