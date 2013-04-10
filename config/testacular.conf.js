basePath = '../';

files = [
    JASMINE,
    JASMINE_ADAPTER,
    'app/lib/angular/angular.js',
    'app/lib/angular/angular-cookies.js',
    'app/lib/angular/angular-loader.js',
    'app/lib/angular/angular-resource.js',
    'app/lib/angular/angular-sanitize.js',
    'app/lib/jquery/jquery-1.7.2.js',
    'app/js/com.noesiscode.js',
    'app/js/com.noesiscode.extentions.Console.js',
    'app/js/com.noesiscode.extentions.ObjectExtention.js',
    'app/js/com.noesiscode.extentions.StringExtention.js',
    'app/js/com.noesiscode.extentions.DateExtention.js',
    'app/js/com.noesiscode.exceptions.Errors.js',
    'app/js/com.noesiscode.utils.NumberUtility.js',
    'app/js/com.noesiscode.utils.converters.date.DateConverter.js',
    'app/js/com.noesiscode.models.Person.js',
    'app/js/com.noesiscode.calendar.CalendarAPI.js',
    'app/js/com.noesiscode.calendar.utils.MonthUtility.js',
    'app/js/com.noesiscode.calendar.models.exceptions.Errors.js',
    'app/js/com.noesiscode.calendar.models.Event.js',
    'app/js/com.noesiscode.calendar.models.EventTransformer.js',
    'app/js/com.noesiscode.calendar.models.Day.js',
    'app/js/com.noesiscode.calendar.models.Week.js',
    'app/js/com.noesiscode.calendar.models.Month.js',
    'app/js/angular/com.noesiscode.calendar.app.js',
    'app/js/angular/com.noesiscode.calendar.controller.js',
    'app/js/angular/com.noesiscode.calendar.component.js',
    'app/js/angular/com.noesiscode.calendar.service.js',
    'test/lib/angular/angular-mocks.js',
    'test/unit/Tester.js',
    'test/unit/jasmine/TesterSpec.js',
    'test/unit/jasmine/DateConverterSpec.js',
    'test/unit/jasmine/NumberUtilitySpec.js',
    'test/unit/jasmine/NameSpaceSpec.js',
    'test/unit/jasmine/ArraySpec.js',
    'test/unit/jasmine/EventSpec.js',
    'test/unit/jasmine/PersonSpec.js',
    'test/unit/jasmine/CalendarSpec.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
    outputFile: 'test_out/unit.xml',
    suite: 'unit'
};