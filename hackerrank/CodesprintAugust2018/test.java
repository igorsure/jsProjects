import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

public class Solution {
    class Node implements Comparable{
        int id;
        char ch;
        Node(int id,char ch){
            this.id=id;
            this.ch=ch;
        }
    }
    HashMap<Integer,HashSet<Integer>> graph;
    Solution()  throws IOException{
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        String[] nm = bufferedReader.readLine().replaceAll("\\s+$", "").split(" ");

        int n = Integer.parseInt(nm[0]);

        int m = Integer.parseInt(nm[1]);

        String names = bufferedReader.readLine();

        List<List<Integer>> roads = new ArrayList<>();

        IntStream.range(0, m).forEach(i -> {
            try {
                roads.add(
                    Stream.of(bufferedReader.readLine().replaceAll("\\s+$", "").split(" "))
                        .map(Integer::parseInt)
                        .collect(toList())
                );
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });

        String[] sf = bufferedReader.readLine().replaceAll("\\s+$", "").split(" ");

        int s = Integer.parseInt(sf[0]);

        int f = Integer.parseInt(sf[1]);
        init();
        int result = solve(n, roads, names, s, f);

        bufferedWriter.write(String.valueOf(result));
        bufferedWriter.newLine();

        bufferedReader.close();
        bufferedWriter.close();
        
    }
    void init(){
        graph=new HashMap<Integer,HashSet<Integer>>();
    }
    void addNode(int node){
        graph.put(node,new HashSet<Integer>());
    }
    void addEdge(int from,int to){
        addNode(from);
        addNode(to);
        graph.get(from).add(to);
    }
    
    // Complete the solve function below.
    int solve(int n, List<List<Integer>> roads, String names, int s, int f) {
        System.out.println(roads);
        return 0;
    }

    public static void main(String[] args) throws IOException {
        Solution sol=new Solution();
    }
}
