import urllib.request
import os

maps = {
    'thor_v03': 'thor_v03',
    'odin_tem03': 'odin_tem03',
    'moc_fild22': 'moc_fild22',
    '1@gl_k': '1@gl_k',
    '2@gl_k': '2@gl_k',
    'thana_boss': 'thana_boss',
    'odin_tem02': 'odin_tem02',
    'pay_fild04': 'pay_fild04',
    'yuno_fild03': 'yuno_fild03',
    'xmas_dun01': 'xmas_dun01',
    'prt_maze03': 'prt_maze03',
    'treasure02': 'treasure02',
}

base_dir = r"c:\Users\andre\Downloads\Projetos\ragnarok-respawn\back-end\public\maps"
os.makedirs(base_dir, exist_ok=True)

for name, filename in maps.items():
    urls = [
        f"https://file5s.ratemyserver.net/maps/{filename}.gif",
        f"https://www.divine-pride.net/img/map/original/{filename}",
        f"https://static.divine-pride.net/images/map/{filename}.png"
    ]
    
    success = False
    for url in urls:
        try:
            print(f"Trying to download {url}...")
            # Preferiremos salvar como .gif mas vamos manter o nome sem extensao primeiro ou gif fixo
            ext = ".png" if ".png" in url else ".gif"
            save_path = os.path.join(base_dir, f"{filename}{ext}")
            
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=5) as response, open(save_path, 'wb') as out_file:
                out_file.write(response.read())
            
            print(f"Success for {name} from {url}")
            success = True
            break
        except Exception as e:
            pass
    if not success:
        print(f"CRITICAL: Failed to download map {name}")

