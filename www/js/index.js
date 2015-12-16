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
    route: "http://HelloMatt.stage1.mybluemix.net",
    guid: "9819f5be-fd58-467d-b214-b714c6b20df0",
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
        BMSClient.initialize(app.route, app.guid);
        app.apiRoute = app.route + app.apiRoute;
        app.getAll();
    },

    // Make a call to our API to get all Items.
    // Update the table with the items
    getAll: function() {
        api.getAll(app.apiRoute, view.refreshTable, app.failure);
    },

    // Make a call to our API to add a new item
    // Update the table with the new items
    addItem: function() {
        api.addItem(app.apiRoute, app.getAll, app.failure);
    },

    // Make a call to our API to update a specific item
    // Update the table with the items 
    updateItem: function(id) {
        api.setItem(app.apiRoute, id, view.updateItem(id, false), app.failure);
    },

    // Enable input text and change edit to save button
    editItem: function(id) {
        view.changeToSave(id);
        view.updateItem(id, true);
    },

    // Make a call to our API to update a specific item
    // Disable input text and change save to edit button
    saveItem: function(id) {
        view.changeToEdit(id);
        view.updateItem(id, false);
        api.setItem(app.apiRoute, id, app.getAll, app.failure);
    },

    // Make a call to our API to delete a specific item
    deleteItem: function(id) {
        api.deleteItem(app.apiRoute, id, app.getAll, app.failure);
    },
    
    // Standard success response
    success: function(res) { 
        alert("Success: " + JSON.stringify(res)); 
    },

    // Standard failure response
    failure: function(res) {
        alert("Failure: " + JSON.stringify(res));
    }
};

app.initialize();