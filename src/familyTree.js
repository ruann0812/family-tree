"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyTree = exports.Relationship = void 0;
var Relationship;
(function (Relationship) {
    Relationship["Children"] = "Children";
    Relationship["Parents"] = "Parents";
    Relationship["Siblings"] = "Siblings";
    Relationship["PaternalUncle"] = "Paternal-Uncle";
    Relationship["MaternalUncle"] = "Maternal-Uncle";
    Relationship["PaternalAunt"] = "Paternal-Aunt";
    Relationship["MaternalAunt"] = "Maternal-Aunt";
    Relationship["SisterInLaw"] = "Sister-In-Law";
    Relationship["BrotherInLaw"] = "Brother-In-Law";
    Relationship["Son"] = "Son";
    Relationship["Daughter"] = "Daughter";
    // Add other relationships as needed
})(Relationship || (exports.Relationship = Relationship = {}));
class FamilyTree {
    constructor(rootPerson) {
        this.root = rootPerson;
    }
    addChild(parentName, childName, gender) {
        const parent = this.findPerson(this.root, parentName.toLowerCase());
        if (parent && parent.spouse) {
            if (parent.gender === 'Male') {
                return false;
            }
            const child = {
                name: childName,
                gender: gender.replace(/\r/g, ""),
                children: [],
                parents: [parent, parent.spouse],
            };
            parent.children.push(child);
            return true;
        }
        return false;
    }
    findPersonByName(name) {
        return this.findPerson(this.root, name.toLowerCase());
    }
    findPerson(node, name, visited = new Set()) {
        // Check if the node has already been visited
        if (visited.has(node))
            return null;
        // Mark this node as visited
        visited.add(node);
        if (node.name.toLowerCase() === name.toLowerCase())
            return node;
        for (const child of node.children) {
            const found = this.findPerson(child, name, visited);
            if (found)
                return found;
        }
        if (node.spouse) {
            const found = this.findPerson(node.spouse, name, visited);
            if (found)
                return found;
        }
        return null;
    }
    findPeopleByRelationship(name, relationship) {
        const person = this.findPersonByName(name);
        if (!person)
            return null; // Person not found
        let relatedPeople = [];
        switch (relationship) {
            case Relationship.Children:
                relatedPeople = person.children;
                break;
            case Relationship.Parents:
                relatedPeople = person.parents || [];
                break;
            case Relationship.Siblings:
                relatedPeople = person.parents ? person.parents[0].children.filter(sibling => sibling !== person) : [];
                break;
            case Relationship.Son:
                let sons = [];
                // Check each child of the person and add the child to the list if they are male
                for (let child of person.children) {
                    if (child.gender === 'Male') {
                        sons.push(child);
                    }
                }
                relatedPeople = sons;
                break;
            case Relationship.Daughter:
                let daugther = [];
                // Check each child of the person and add the child to the list if they are male
                for (let child of person.children) {
                    if (child.gender === 'Female') {
                        daugther.push(child);
                    }
                }
                relatedPeople = daugther;
                break;
            case Relationship.PaternalUncle:
                if (!person || !person.parents || person.parents.length < 1)
                    return null; // Person not found or no parents information
                const father = person.parents.find(p => p.gender === 'Male');
                if (!father || !father.parents || father.parents.length < 1)
                    return null; // No father or grandparents information
                const paternalGrandfather = father.parents.find(p => p.gender === 'Male');
                if (!paternalGrandfather)
                    return null; // No paternal grandfather information
                let paternalUncles = [];
                // Loop through the children of the paternal grandfather and find their male children who are not the father
                paternalGrandfather.children.forEach(child => {
                    if (child.gender === 'Male' && child.name !== father.name) {
                        paternalUncles.push(child);
                    }
                });
                relatedPeople = paternalUncles;
                break;
            case Relationship.MaternalUncle:
                if (!person || !person.parents || person.parents.length < 1)
                    return null; // Person not found or no parents information
                const mother = person.parents.find(p => p.gender === 'Female');
                if (!mother || !mother.parents || mother.parents.length < 1)
                    return null; // No mother or grandparents information
                const maternalGrandmother = mother.parents.find(p => p.gender === 'Female');
                if (!maternalGrandmother)
                    return null; // No maternal grandmother information
                let maternalUncles = [];
                // Loop through the children of the maternal grandmother and find their male children who are not the mother
                maternalGrandmother.children.forEach(child => {
                    if (child.gender === 'Male' && child.name !== mother.name) {
                        maternalUncles.push(child);
                    }
                });
                relatedPeople = maternalUncles;
                break;
            case Relationship.PaternalAunt:
                if (!person || !person.parents || person.parents.length < 1)
                    return null; // Person not found or no parents information
                const father2 = person.parents.find(p => p.gender === 'Male');
                if (!father2 || !father2.parents || father2.parents.length < 1)
                    return null; // No father2 or grandparents information
                const paternalGrandparents = father2.parents.find(p => p.gender === 'Male');
                if (!paternalGrandparents)
                    return null; // No paternal grandparents information
                let aunts = [];
                // Loop through each paternal grandparent and find their female children who are not the father2's mother
                paternalGrandparents.children.forEach(child => {
                    var _a;
                    if (child.gender === 'Female' && child.name !== ((_a = father2.spouse) === null || _a === void 0 ? void 0 : _a.name)) {
                        aunts.push(child);
                    }
                });
                relatedPeople = aunts;
                break;
            case Relationship.MaternalAunt:
                // code here
                if (!person || !person.parents || person.parents.length < 1)
                    return null; // Person not found or no parents information
                const mother2 = person.parents.find(p => p.gender === 'Female');
                if (!mother2 || !mother2.parents || mother2.parents.length < 1)
                    return null; // No mother or grandparents information
                let maternalAunts = [];
                // Consider only the children from one of the grandparents (e.g., the maternal grandfather)
                const maternalGrandfather = mother2.parents.find(p => p.gender === 'Male');
                if (maternalGrandfather) {
                    maternalGrandfather.children.forEach(child => {
                        if (child.gender === 'Female' && child.name !== mother2.name) {
                            maternalAunts.push(child);
                        }
                    });
                }
                relatedPeople = maternalAunts;
                break;
            case Relationship.SisterInLaw:
                let sisterInLaws = [];
                // If person has a spouse, check for any sisters the spouse has
                if (person.spouse && person.spouse.parents && person.spouse.parents[0]) {
                    const spouseSiblings = person.spouse.parents[0].children;
                    for (let sibling of spouseSiblings) {
                        if (sibling.gender === 'Female' && sibling.name !== person.spouse.name) {
                            sisterInLaws.push(sibling);
                        }
                    }
                }
                // Check for any sisters-in-law from person's siblings
                if (person.parents && person.parents.length > 0) {
                    const siblings = person.parents[0].children;
                    for (let sibling of siblings) {
                        if (sibling.gender === 'Male' && sibling.spouse) {
                            sisterInLaws.push(sibling.spouse);
                        }
                    }
                }
                relatedPeople = sisterInLaws;
                break;
            case Relationship.BrotherInLaw:
                let brotherInLaws = [];
                // If person has a spouse, check for any brothers the spouse has
                if (person.spouse && person.spouse.parents && person.spouse.parents[0]) {
                    const spouseSiblings = person.spouse.parents[0].children;
                    for (let sibling of spouseSiblings) {
                        if (sibling.gender === 'Male' && sibling.name !== person.spouse.name) {
                            brotherInLaws.push(sibling);
                        }
                    }
                }
                // Check for any brothers-in-law from person's siblings
                if (person.parents && person.parents.length > 0) {
                    const siblings = person.parents[0].children;
                    for (let sibling of siblings) {
                        if (sibling.gender === 'Female' && sibling.spouse) {
                            brotherInLaws.push(sibling.spouse);
                        }
                    }
                }
                relatedPeople = brotherInLaws;
                break;
        }
        return relatedPeople;
    }
}
exports.FamilyTree = FamilyTree;
