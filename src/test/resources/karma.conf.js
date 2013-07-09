/*
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 1/7/13
 * Time: 12:52 PM
 * To change this template use File | Settings | File Templates.
 */
basePath = '../../../';

files = [
    JASMINE,
    JASMINE_ADAPTER,
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
    'src/main/webapp/js/angular/com.noesiscode.calendar.controller.js',
    'src/main/webapp/js/angular/com.noesiscode.calendar.component.js',
    'src/main/webapp/js/angular/com.noesiscode.calendar.service.js',
    'src/test/lib/angular/angular-mocks.js',
    'src/test/unit/Tester.js',
    'src/test/unit/jasmine/TesterSpec.js',
    'src/test/unit/jasmine/DateConverterSpec.js',
    'src/test/unit/jasmine/NumberUtilitySpec.js',
    'src/test/unit/jasmine/NameSpaceSpec.js',
    'src/test/unit/jasmine/ArraySpec.js',
    'src/test/unit/jasmine/EventSpec.js',
    'src/test/unit/jasmine/PersonSpec.js',
    'src/test/unit/jasmine/CalendarSpec.js'
];
// list of files to exclude
exclude = ['src/main/webapp/lib/angular/angular-*.min.js'];

autoWatch = true;

browsers = ['src/test/scripts/ie6.sh'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};




