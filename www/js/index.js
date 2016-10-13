/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app =  {

    // Bluemix credentials
    route: "<APPLICATION_ROUTE>",
    guid: "<APPLICATION_GUID>",

    // API route for Items model
    apiRoute: "/api/Items",

    // Initialize BMSClient
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to use the 'route' and 'guid'
    // variables, we must explicitly call 'app.route' and 'app.guid'
    onDeviceReady: function() {
        BMSClient.initialize(BMSClient.REGION_US_SOUTH);
        app.apiRoute = app.route + app.apiRoute;
        app.getItems();
    },

    // Make a call to our API to get all Items.
    // Update the table with the items if the request succeeds
    getItems: function() {
        api.getItems(app.apiRoute, view.refreshTable, app.failure);
    },

    // Make a call to our API to add a new item
    // Refresh the table to include the new item if the request succeeds
    addItem: function() {
        api.addItem(app.apiRoute, app.getItems, app.failure);
    },

    // Make a call to our API to update a specific item when the checkbox is toggled
    // Refresh the table to include the updated item if the request succeeds
    updateItem: function(id) {
        api.updateItem(app.apiRoute, id, view.updateItem(id, false), app.failure);
    },

    // Enable input text and change edit to save button
    editItem: function(id) {
        view.changeToSave(id);
        view.updateItem(id, true);
    },

    // Make a call to our API to update a specific item after the text is edited and saved
    // Disable input text and change save to edit button
    saveItem: function(id) {
        view.changeToEdit(id);
        view.updateItem(id, false);
        api.updateItem(app.apiRoute, id, app.getItems, app.failure);
    },

    // Make a call to our API to delete a specific item
    deleteItem: function(id) {
        api.deleteItem(app.apiRoute, id, app.getItems, app.failure);
    },

    // Standard failure response
    failure: function(res) {
        alert("Failure: " + JSON.stringify(res));
    }
};

app.initialize();
