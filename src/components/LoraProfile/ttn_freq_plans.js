const ttn_frequency_plans = [
    {
      "id": "EU_863_870",
      "name": "Europe 863-870 MHz (SF12 for RX2)",
    },
    {
      "id": "EU_863_870_TTN",
      "name": "Europe 863-870 MHz (SF9 for RX2 - recommended)",
    },
    {
      "id": "EU_863_870_ROAMING_DRAFT",
      "name": "Europe 863-870 MHz, 6 channels for roaming (Draft)",
    },
    {
      "id": "EU_433",
      "name": "Europe 433 MHz (ITU region 1)",
    },
    {
      "id": "US_902_928_FSB_1",
      "name": "United States 902-928 MHz, FSB 1",
    },
    {
      "id": "US_902_928_FSB_2",
      "name": "United States 902-928 MHz, FSB 2 (used by TTN)",
    },
    {
      "id": "US_902_928_FSB_3",
      "name": "United States 902-928 MHz, FSB 3",
    },
    {
      "id": "US_902_928_FSB_4",
      "name": "United States 902-928 MHz, FSB 4",
    },
    {
      "id": "US_902_928_FSB_5",
      "name": "United States 902-928 MHz, FSB 5",
    },
    {
      "id": "US_902_928_FSB_6",
      "name": "United States 902-928 MHz, FSB 6",
    },
    {
      "id": "US_902_928_FSB_7",
      "name": "United States 902-928 MHz, FSB 7",
    },
    {
      "id": "US_902_928_FSB_8",
      "name": "United States 902-928 MHz, FSB 8",
    },
    {
      "id": "AU_915_928_FSB_1",
      "name": "Australia 915-928 MHz, FSB 1",
    },
    {
      "id": "AU_915_928_FSB_2",
      "name": "Australia 915-928 MHz, FSB 2 (used by TTN)",
    },
    {
      "id": "AU_915_928_FSB_3",
      "name": "Australia 915-928 MHz, FSB 3",
    },
    {
      "id": "AU_915_928_FSB_4",
      "name": "Australia 915-928 MHz, FSB 4",
    },
    {
      "id": "AU_915_928_FSB_5",
      "name": "Australia 915-928 MHz, FSB 5",
    },
    {
      "id": "AU_915_928_FSB_6",
      "name": "Australia 915-928 MHz, FSB 6",
    },
    {
      "id": "AU_915_928_FSB_7",
      "name": "Australia 915-928 MHz, FSB 7",
    },
    {
      "id": "AU_915_928_FSB_8",
      "name": "Australia 915-928 MHz, FSB 8",
    },
    {
      "id": "CN_470_510_FSB_1",
      "name": "China 470-510 MHz, FSB 1",
    },
    {
      "id": "CN_470_510_FSB_11",
      "name": "China 470-510 MHz, FSB 11 (used by TTN)",
    },
    {
      "id": "AS_920_923",
      "name": "Asia 920-923 MHz",
    },
    {
      "id": "AS_920_923_LBT",
      "name": "Asia 920-923 MHz with LBT",
    },
    {
      "id": "AS_920_923_TTN_JP_1",
      "name": "Japan 920-923 MHz with LBT (channels 31-38)",
    },
    {
      "id": "AS_920_923_TTN_JP_1_LAND_MOBILE",
      "name": "Japan 920-923 MHz with LBT (channels 31-38), Max EIRP 27 dBm",
    },
    {
      "id": "AS_920_923_TTN_JP_2",
      "name": "Japan 920-923 MHz with LBT (channels 24-27 and 35-38)",
    },
    {
      "id": "AS_920_923_TTN_JP_3",
      "name": "Japan 920-923 MHz with LBT (channels 24-31)",
    },
    {
      "id": "AS_920_923_TTN_JP_3_LAND_MOBILE",
      "name": "Japan 920-923 MHz with LBT (channels 24-31), Max EIRP 27 dBm",
    },
    {
      "id": "AS_923",
      "name": "Asia 915-928 MHz (AS923 Group 1) with only default channels",
    },
    {
      "id": "AS_923_2",
      "name": "Asia 920-923 MHz (AS923 Group 2) with only default channels",
    },
    {
      "id": "AS_923_3",
      "name": "Asia 915-921 MHz (AS923 Group 3) with only default channels",
    },
    {
      "id": "AS_923_4",
      "name": "Asia 917-920 MHz (AS923 Group 4) with only default channels",
    },
    {
      "id": "AS_923_NDT",
      "name": "Asia 915-928 MHz (AS923 Group 1) with only default channels and dwell time disabled",
    },
    {
      "id": "AS_923_DT",
      "name": "Asia 915-928 MHz (AS923 Group 1) with only default channels and dwell time enabled",
    },
    {
      "id": "AS_923_2_NDT",
      "name": "Asia 920-923 MHz (AS923 Group 2) with only default channels and dwell time disabled",
    },
    {
      "id": "AS_923_2_DT",
      "name": "Asia 920-923 MHz (AS923 Group 2) with only default channels and dwell time enabled",
    },
    {
      "id": "AS_923_3_NDT",
      "name": "Asia 920-923 MHz (AS923 Group 3) with only default channels and dwell time disabled",
    },
    {
      "id": "AS_923_3_DT",
      "name": "Asia 920-923 MHz (AS923 Group 3) with only default channels and dwell time enabled",
    },
    {
      "id": "AS_923_4_NDT",
      "name": "Asia 920-923 MHz (AS923 Group 4) with only default channels and dwell time disabled",
    },
    {
      "id": "AS_923_4_DT",
      "name": "Asia 920-923 MHz (AS923 Group 4) with only default channels and dwell time enabled",
    },
    {
      "id": "AS_923_925",
      "name": "Asia 923-925 MHz",
    },
    {
      "id": "AS_923_925_LBT",
      "name": "Asia 923-925 MHz with LBT",
    },
    {
      "id": "AS_920_923_TTN_AU",
      "name": "Asia 920-923 MHz (used by TTN Australia)",
    },
    {
      "id": "AS_923_925_TTN_AU",
      "name": "Asia 923-925 MHz (used by TTN Australia - secondary channels)",
    },
    {
      "id": "KR_920_923_TTN",
      "name": "South Korea 920-923 MHz",
    },
    {
      "id": "IN_865_867",
      "name": "India 865-867 MHz",
    },
    {
      "id": "RU_864_870_TTN",
      "name": "Russia 864-870 MHz",
    },
    {
      "id": "ISM_2400_3CH_DRAFT2",
      "name": "LoRa 2.4 GHz with 3 channels (Draft 2)",
     }
  ]

export default ttn_frequency_plans
