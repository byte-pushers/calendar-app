var CalendarApp = CalendarApp || {};
CalendarApp.todaysEvents = [];
CalendarApp.models = CalendarApp.models || CalendarApp.namespace("com.noesiscode.calendar.models");
CalendarApp.models.findEventById = function (id, events) {
    'use strict';
    var i, targetEvent = null;
    for (i = 0; i < events.length; i = i + 1) {
        if (events[i] !== undefined && events[i] !== null) {
            if (events[i].id === id) {
                targetEvent = events[i];
            }
        }
    }
    return targetEvent;
};
/*global $, NoesisCode */
var CalendarApp = CalendarApp || {};
CalendarApp.models = CalendarApp.models || CalendarApp.namespace("com.noesiscode.calendar.models");
/**
 * Creates a {@link Month} object that represents the current calendar month.
 *
 * @class Represents a calendar month.
 * @returns An instance of the Week class.
 *
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Calendar = function () {
    "use strict";
    var that = this,
    /**
     * <p>Represents the current calendar month.</p>
     * @private
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
        currentMonth = new CalendarApp.models.Month(),
    /**
     * <p>Represents a cached calendar month.
     * @private
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
        cachedMonth = new CalendarApp.models.Month();
    /**
     * <p>Gets the {@link Calendar.models.Month} object for the current month.</p>
     *
     * @returns {Calendar.models.Month} The {@link Calendar.models.Month} object for the current month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getCurrentMonth = function () {
        return currentMonth;
    };
    /**
     * <p>Sets the {@link Calendar.models.Month} object for the current month.</p>
     *
     * @param {Calendar.models.Month} Represents a new current {@link Calendar.models.Month} object.
     * @returns {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.setCurrentMonth = function (cMonth) {
        currentMonth = cMonth;
    };
    /**
     * <p>Gets the cached {@link Calendar.models.Month} object for the current calendar view.</p>
     *
     * @returns {Calendar.models.Month} The cached {@link Calendar.models.Month} object for the current calendar view.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getCachedMonth = function () {
        return cachedMonth;
    };
    /**
     * <p>Sets the cached {@link Calendar.models.Month} object for the current calendar view.</p>
     *
     * @param {Calendar.models.Month} Represents a new cached {@link Calendar.models.Month} object.
     * @returns {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.setCurrentMonth = function (cMonth) {
        cachedMonth = cMonth;
    };
}



