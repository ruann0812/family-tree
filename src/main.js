"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const initializeFamilyTree_1 = require("./initializeFamilyTree");
const tree = (0, initializeFamilyTree_1.initializeFamilyTree)();
const commands = fs_1.default.readFileSync('commands.txt', 'utf-8').trim().split('\n');
commands.forEach((commandLine) => {
    const parts = commandLine.split(' ');
    let command, motherName, childName, gender;
    command = parts[0];
    switch (command) {
        case 'ADD_CHILD':
            if (parts.length === 5) {
                motherName = parts[1] + " " + parts[2]; // combine the two parts of the name
                childName = parts[3];
                gender = parts[4];
            }
            else {
                motherName = parts[1];
                childName = parts[2];
                gender = parts[3];
            }
            const mother = tree.findPersonByName(motherName);
            if (mother) {
                const addChildResult = tree.addChild(motherName, childName, gender);
                console.log(addChildResult ? 'CHILD_ADDED' : 'CHILD_ADDITION_FAILED');
            }
            else {
                console.log('PERSON_NOT_FOUND');
            }
            break;
        case 'GET_RELATIONSHIP':
            let name, relationship;
            if (parts.length === 4) {
                name = parts[1] + " " + parts[2]; // combine the two parts of the name
                relationship = parts[3];
            }
            else {
                name = parts[1];
                relationship = parts[2];
            }
            // Assuming you have a findPeopleByRelationship method that takes these parameters
            const relatedPeople = tree.findPeopleByRelationship(name, relationship);
            if (relatedPeople && relatedPeople.length > 0) {
                console.log(relatedPeople.map(person => person.name).join(', '));
            }
            else {
                console.log('NONE');
            }
            break;
        default:
            console.error(`Unknown command: ${command}`);
            break;
    }
});
