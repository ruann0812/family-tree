// initializeFamilyTree.ts

import { FamilyTree, Person } from './familyTree'; // FamilyTree class and Person interface are defined in familyTree.ts

export function initializeFamilyTree() {
  
  const createPerson = (name: string, gender: string): Person => {
    return { name, gender, children: [], parents: [] };
  };


  const kingArthur = createPerson('king arthur', 'Male');
  const queenElizabeth = createPerson('queen elizabeth', 'Female');
  kingArthur.spouse = queenElizabeth;
  queenElizabeth.spouse = kingArthur;

  // bill and flora tree
  const bill = createPerson('bill', 'Male');
  bill.parents = [kingArthur, queenElizabeth];
  kingArthur.children.push(bill);
  queenElizabeth.children.push(bill);

  const flora = createPerson('flora', 'Female');
  bill.spouse = flora;
  flora.spouse = bill;

  const victoire = createPerson('victoire', 'Female');
  bill.children.push(victoire);
  flora.children.push(victoire);
  victoire.parents = [bill, flora];

  const ted = createPerson('ted', 'Male');
  ted.spouse = victoire;
  victoire.spouse = ted;

  const remus = createPerson('remus', 'Male');
  ted.children.push(remus);
  victoire.children.push(remus);
  remus.parents = [ted, victoire];

  const dominique = createPerson('dominique', 'Female');
  dominique.parents = [bill, flora];
  bill.children.push(dominique);
  flora.children.push(dominique);

  const louis = createPerson('louis', 'Male');
  louis.parents = [bill, flora];
  bill.children.push(louis);
  flora.children.push(louis);

  const charlie = createPerson('charlie', 'Male');
  charlie.parents = [kingArthur, queenElizabeth];
  kingArthur.children.push(charlie);
  queenElizabeth.children.push(charlie);

  // percy and audrey tree
  const percy = createPerson('percy', 'Male');
  percy.parents = [kingArthur, queenElizabeth];
  kingArthur.children.push(percy);
  queenElizabeth.children.push(percy);

  const audrey = createPerson('audrey', 'Female');
  audrey.spouse = percy;
  percy.spouse = audrey;

  const molly = createPerson('molly', 'Female');
  molly.parents = [percy, audrey];
  percy.children.push(molly);
  audrey.children.push(molly);

  const lucy = createPerson('lucy', 'Female');
  lucy.parents = [percy, audrey];
  percy.children.push(lucy);
  audrey.children.push(lucy);


  // ronald and helen tree
    const ronald = createPerson('ronald', 'Male');
    ronald.parents = [kingArthur, queenElizabeth];
    kingArthur.children.push(ronald);
    queenElizabeth.children.push(ronald);

    const helen = createPerson('helen', 'Female');
    helen.spouse = ronald;
    ronald.spouse = helen;

    const rose = createPerson('rose', 'Female');
    rose.parents = [ronald, helen];
    ronald.children.push(rose);
    helen.children.push(rose);

    const malfoy = createPerson('malfoy', 'Male');
    malfoy.spouse = rose;
    rose.spouse = malfoy;

    const draco = createPerson('draco', 'Male');
    draco.parents = [malfoy, rose];
    malfoy.children.push(draco);
    rose.children.push(draco);

    const aster = createPerson('aster', 'Female');
    aster.parents = [malfoy, rose];
    malfoy.children.push(aster);
    rose.children.push(aster);

    const hugo = createPerson('hugo', 'Male');
    hugo.parents = [ronald, helen];
    ronald.children.push(hugo);
    helen.children.push(hugo);

  // ginerva and harry tree

  const ginerva = createPerson('ginerva', 'Female');
  ginerva.parents = [kingArthur, queenElizabeth];
  kingArthur.children.push(ginerva);
  queenElizabeth.children.push(ginerva);

  const harry = createPerson('harry', 'Male');
  harry.spouse = ginerva;
  ginerva.spouse = harry;

  const james = createPerson('james', 'Male');
  james.parents = [harry, ginerva];
  harry.children.push(james);
  ginerva.children.push(james);

  const darcy = createPerson('darcy', 'Female');
  darcy.spouse = james;
  james.spouse = darcy;

  const william = createPerson('william', 'Male');
  william.parents = [james, darcy];
  james.children.push(william);
  darcy.children.push(william);

  const albus = createPerson('albus', 'Male');
  albus.parents = [harry, ginerva];
  harry.children.push(albus);
  ginerva.children.push(albus);

  const alice = createPerson('alice', 'Female');
  alice.spouse = albus;
  albus.spouse = alice;

  const ron = createPerson('ron', 'Male');
  ron.parents = [albus, alice];
  albus.children.push(ron);
  alice.children.push(ron);

  const ginny = createPerson('ginny', 'Female');
  ginny.parents = [albus, alice];
  albus.children.push(ginny);
  alice.children.push(ginny);

  const lily = createPerson('lily', 'Female');
  lily.parents = [harry, ginerva];
  harry.children.push(lily);
  ginerva.children.push(lily);

  const tree = new FamilyTree(queenElizabeth); // Assuming a constructor that takes the root of the family tree
  return tree;
}