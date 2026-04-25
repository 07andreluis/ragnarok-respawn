import urllib.request
import os

mobs = {
    'amonra': 1096,
    'eremes': 1637,
    'atroce': 1785,
    'whitelady': 1630,
    'baphomet': 1039,
    'beelzebub': 1873,
    'boitata': 2068,
    'darklord': 1272,
    'detardeurus': 1719,
    'doppelganger': 1046,
    'dracula': 1389,
    'drake': 1112,
    'eddga': 1115,
    'evilsnakelord': 1418,
    'fallenbishop': 1871,
    'hatii': 1252,
    'gloomundernight': 1768,
    'gtb': 1086,
    'gopinich': 1885,
    'margaretha': 1638,
    'kathryne': 1639,
    'incantation': 1492,
    'kiel': 1734,
    'stormyknight': 1251,
    'ladytanee': 1688,
    'seyren': 1634,
    'lordofdeath': 1373,
    'maya': 1147,
    'mistress': 1059,
    'moonlight': 1150,
    'orchero': 1087,
    'orclord': 1190,
    'osiris': 1038,
    'pharaoh': 1157,
    'phreeoni': 1159,
    'rsx': 1623,
    'cecil': 1635,
    'taogunka': 1583,
    'turtlegeneral': 1312,
    'vesper': 1685,
    'howard': 1636,
    'cenia': 1658,
    'gryphon': 1146,
    'mayapurple': 1289
}

base_dir = r"c:\Users\andre\Downloads\Projetos\ragnarok-respawn\back-end\public\images"
os.makedirs(base_dir, exist_ok=True)

for name, mob_id in mobs.items():
    urls = [
        f"https://file5s.ratemyserver.net/mobs/{mob_id}.gif"
    ]
    
    success = False
    for url in urls:
        try:
            print(f"Trying to download {url}...")
            save_path = os.path.join(base_dir, f"{name}.gif")
            if os.path.exists(save_path):
                print(f"Already exists: {name}.gif")
                success = True
                break
                
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=5) as response, open(save_path, 'wb') as out_file:
                out_file.write(response.read())
            
            print(f"Success for {name}")
            success = True
            break
        except Exception as e:
            pass
    if not success:
        print(f"CRITICAL: Failed to download {name}")
