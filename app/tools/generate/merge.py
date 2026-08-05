# -*- coding: utf-8 -*-
"""DE/EN zusammenführen: Regeln über die Regelnummer, Erläuterungen über die
   Ordinalposition innerhalb der Regelgruppe. Wo die englische Ausgabe keine
   Entsprechung hat, greift eine Arbeitsübersetzung aus de_only_en.py."""
import json, collections, sys
sys.path.insert(0, '/sessions/affectionate-serene-volta/mnt/outputs/build')
from de_only_en import TRANS, TITLES_EN

chapters_de = json.load(open('chapters_de.json'))
chapters_en = json.load(open('chapters_en.json'))

def groups(blocks):
    out = []; cur = None
    for b in blocks:
        if b['t'] == 'rule':
            cur = (b['n'], b, []); out.append(cur)
        elif cur is not None:
            cur[2].append(b)
    return out

merged = {}; st = collections.Counter()
for chap in chapters_de:
    num_ch = chap['id']
    gd = groups(chap['blocks'])
    ge = {g[0]: g for g in groups(chapters_en[str(num_ch)])}
    out = []
    for num, rb, notes in gd:
        eg = ge.get(num)
        rx = {'de': rb['x']}
        if eg:
            rx['en'] = eg[1]['x']; st['rule_ok'] += 1
        else:
            st['rule_miss'] += 1; print('Regel ohne EN:', num_ch, num)
        out.append({'t': 'rule', 'n': num, 'x': rx})
        enotes = eg[2] if eg else []
        for nb in notes:
            # Nur Gleichartiges paaren: benannte Erläuterungen mit benannten,
            # titellose Fortsetzungsabsätze mit titellosen. Sonst verrutscht die
            # Zuordnung, sobald eine Ausgabe einen Absatz mehr enthält.
            def kind(x): return (x['t'], bool(x.get('h')))
            same = [x for x in enotes if kind(x) == kind(nb)]
            mine = [x for x in notes if kind(x) == kind(nb)]
            idx = mine.index(nb)
            e = same[idx] if idx < len(same) else None
            item = {'t': nb['t'], 'x': {'de': nb['x']}}
            if nb.get('h'): item['h'] = {'de': nb['h']}
            if e:
                item['x']['en'] = e['x']
                if e.get('h'):
                    item.setdefault('h', {'de': nb.get('h', '')})['en'] = e['h']
                st['note_ok'] += 1
            else:
                for pre, en_text in TRANS.items():
                    if nb['x'].startswith(pre):
                        item['x']['en'] = en_text
                        item['tr'] = True
                        if item.get('h') and not item['h'].get('en'):
                            item['h']['en'] = TITLES_EN.get(item['h']['de'], item['h']['de'])
                        st['note_translated'] += 1
                        break
                else:
                    st['note_miss'] += 1
                    print('Erläuterung ohne EN:', num_ch, nb['x'][:60])
            out.append(item)
    merged[num_ch] = out

print(dict(st))
json.dump(merged, open('merged_1_10.json', 'w'), ensure_ascii=False, indent=1)
