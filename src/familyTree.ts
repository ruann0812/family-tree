export interface Person {
    name: string;
    children: Person[];
    parents?: Person[];
    spouse?: Person;
    gender?: string;
  }


export enum Relationship {
    Children = 'Children',
    Parents = 'Parents',
    Siblings = 'Siblings',
    PaternalUncle = 'Paternal-Uncle',
    MaternalUncle = 'Maternal-Uncle',
    PaternalAunt = 'Paternal-Aunt',
    MaternalAunt = 'Maternal-Aunt',
    SisterInLaw = 'Sister-In-Law',
    BrotherInLaw = 'Brother-In-Law',
    Son = 'Son',
    Daughter = 'Daughter',
    // Add other relationships as needed
  }
  
  
  export class FamilyTree {
    private root: Person;
  
    constructor(rootPerson: Person) {
      this.root = rootPerson;
    }

    public addChild(parentName: string, childName: string, gender: string): boolean {
      const parent = this.findPerson(this.root, parentName.toLowerCase());
      if (parent && parent.spouse) {
          if (parent.gender === 'Male') {
            return false;
          }
          const child: Person = {
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
    
    public findPersonByName(name: string): Person | null {
        return this.findPerson(this.root, name.toLowerCase());
      }
    
      public findPerson(node: Person, name: string, visited: Set<Person> = new Set()): Person | null {
        // Check if the node has already been visited
        if (visited.has(node)) return null;
        
        // Mark this node as visited
        visited.add(node);
        
        if (node.name.toLowerCase() === name.toLowerCase()) return node;
      
        for (const child of node.children) {
          const found = this.findPerson(child, name, visited);
          if (found) return found;
        }
      
        if (node.spouse) {
          const found = this.findPerson(node.spouse, name, visited);
          if (found) return found;
        }
      
        return null;
      }
      

    public findPeopleByRelationship(name: string, relationship: Relationship): Person[] | null {
    const person = this.findPersonByName(name);
    if (!person) return null; // Person not found
    
    let relatedPeople: Person[] = [];
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
          let sons: Person[] = [];
          // Check each child of the person and add the child to the list if they are male
          for (let child of person.children) {
              if (child.gender === 'Male') {
                  sons.push(child);
              }
          }
      
          relatedPeople = sons;
        break;
        case Relationship.Daughter:
          let daugther: Person[] = [];

          // Check each child of the person and add the child to the list if they are male
          for (let child of person.children) {
              if (child.gender === 'Female') {
                  daugther.push(child);
              }
          }
      
          relatedPeople = daugther;
        break;
        case Relationship.PaternalUncle:
          if (!person || !person.parents || person.parents.length < 1) return null; // Person not found or no parents information

          const father = person.parents.find(p => p.gender === 'Male');
          if (!father || !father.parents || father.parents.length < 1) return null; // No father or grandparents information

          const paternalGrandfather = father.parents.find(p => p.gender === 'Male');
          if (!paternalGrandfather) return null; // No paternal grandfather information

          let paternalUncles: Person[] = [];

          // Loop through the children of the paternal grandfather and find their male children who are not the father
          paternalGrandfather.children.forEach(child => {
              if (child.gender === 'Male' && child.name !== father.name) {
                  paternalUncles.push(child);
              }
          });

          relatedPeople = paternalUncles;

        break;
        case Relationship.MaternalUncle:
          if (!person || !person.parents || person.parents.length < 1) return null; // Person not found or no parents information

          const mother = person.parents.find(p => p.gender === 'Female');
          if (!mother || !mother.parents || mother.parents.length < 1) return null; // No mother or grandparents information
          
          const maternalGrandmother = mother.parents.find(p => p.gender === 'Female');
          if (!maternalGrandmother) return null; // No maternal grandmother information
          
          let maternalUncles: Person[] = [];
          
          // Loop through the children of the maternal grandmother and find their male children who are not the mother
          maternalGrandmother.children.forEach(child => {
              if (child.gender === 'Male' && child.name !== mother.name) {
                maternalUncles.push(child);
              }
          });
          
          relatedPeople = maternalUncles;
          
        break;
        case Relationship.PaternalAunt:
          if (!person || !person.parents || person.parents.length < 1) return null; // Person not found or no parents information

          const father2 = person.parents.find(p => p.gender === 'Male');
          if (!father2 || !father2.parents || father2.parents.length < 1) return null; // No father2 or grandparents information
          
          const paternalGrandparents = father2.parents.find(p => p.gender === 'Male');
          if (!paternalGrandparents) return null; // No paternal grandparents information
          let aunts: Person[] = [];
          
          // Loop through each paternal grandparent and find their female children who are not the father2's mother
          
            paternalGrandparents.children.forEach(child => {
                  if (child.gender === 'Female' && child.name !== father2.spouse?.name) {
                      aunts.push(child);
                  }
              });
          
          relatedPeople = aunts;
          
        break;
        case Relationship.MaternalAunt:
        // code here
        if (!person || !person.parents || person.parents.length < 1) return null; // Person not found or no parents information

        const mother2 = person.parents.find(p => p.gender === 'Female');
        if (!mother2 || !mother2.parents || mother2.parents.length < 1) return null; // No mother or grandparents information

        let maternalAunts: Person[] = [];

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
          let sisterInLaws: Person[] = [];

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
          let brotherInLaws: Person[] = [];

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