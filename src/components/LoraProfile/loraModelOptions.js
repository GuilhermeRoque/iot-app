const loraWanVersions = [
    {name: "Especificação v1.0", value: 1},
    {name: "Especificação v1.0.1", value: 2},
    {name: "Especificação v1.0.2", value: 3},
    {name: "Especificação v1.1", value: 4},
    {name: "Especificação v1.0.3", value: 5},
    {name: "Especificação v1.0.4", value: 6},
]

const loraPhyVersions = [
  {
    name: "PHY_UNKNOWN",
    value: 0,
    loraWanVersions: [1,2,3,4,5,6]
  }, 	
  {
    name: "PHY_V1_0",
    value: 1,
    loraWanVersions: [1,2,3],
  },
  // {
  //   name: "TS001_V1_0",
  //   value: 1,
  //   loraWanVersions: [] 	

  // },
  {
    name: "PHY_V1_0_1",
    value: 2,
    loraWanVersions: [] 	

  },
  // {
  //   name: "TS001_V1_0_1",
  //   value: 2,
  //   loraWanVersions: [] 	

  // },
  {
    name: "PHY_V1_0_2_REV_A",
    value: 3,
    loraWanVersions: []
  },
  // // {
  // //   name: "RP001_V1_0_2",
  // //   value: 3,
  // //   loraWanVersions: []
  // // }
  // ,
  {
    name: "PHY_V1_0_2_REV_B",
    value: 4,
    loraWanVersions: []
  }
  ,
  // {
  //   name: "RP001_V1_0_2_REV_B",
  //   value: 4,
  //   loraWanVersions: []
  // }
  // ,
  {
    name: "PHY_V1_1_REV_A",
    value: 5,
    loraWanVersions: []
  }
  ,
  // {
  //   name: "RP001_V1_1_REV_A",
  //   value: 5,
  //   loraWanVersions: []
  // }
  // ,
  {
    name: "PHY_V1_1_REV_B",
    value: 6,
    loraWanVersions: []
  }
  ,
  // {
  //   name: "RP001_V1_1_REV_B",
  //   value: 6,
  //   loraWanVersions: []
  // }
  // ,
  {
    name: "PHY_V1_0_3_REV_A",
    value: 7,
    loraWanVersions: []
  }
  ,
  // {
  //   name: "RP001_V1_0_3_REV_A",
  //   value: 7,
  //   loraWanVersions: []
  // }
  // ,
  {
    name: "RP002_V1_0_0",
    value: 8,
    loraWanVersions: []
  }
  ,
  {
    name: "RP002_V1_0_1",
    value: 9,
    loraWanVersions: []
  }
  ,
  {
    name: "RP002_V1_0_2",
    value: 10,
    loraWanVersions: []
  },
  {
    name: "RP002_V1_0_3",
    value: 11,
    loraWanVersions: []
  }

]

const loraWanVersionsValueMap = new Map()
for(const loraWanVersion of loraWanVersions){loraWanVersionsValueMap.set(loraWanVersion.value, loraWanVersion.name)}

const loraPhyVersionsValueMap = new Map()
for(const loraPhyVersion of loraPhyVersions){loraPhyVersionsValueMap.set(loraPhyVersion.value, loraPhyVersion.name)}


module.exports = {
    loraWanVersions,
    loraPhyVersions,
    loraWanVersionsValueMap,
    loraPhyVersionsValueMap,   
}