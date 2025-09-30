import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { skills } from "./data/skills";

export function Skills() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
      {Object.entries(skills).map(([group, items]) => (
        <Card key={group} className="rounded-3xl card-neo">
          <CardHeader className="pb-2"><CardTitle className="text-base capitalize">{group}</CardTitle></CardHeader>
          <CardContent className="pt-0 flex flex-wrap gap-2">
            {(items as string[]).map(s => <Badge key={s} variant="secondary" className="rounded-full">{s}</Badge>)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}