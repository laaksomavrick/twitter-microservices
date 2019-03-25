
#!/bin/sh
for i in `ls -v cql/*.cql`;
    do cat $i | cqlsh;
done;