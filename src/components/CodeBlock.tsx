import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../utils/theme';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  // Simple syntax highlighting for JavaScript
  const highlightCode = (code: string) => {
    const lines = code.split('\n');

    return lines.map((line, lineIndex) => {
      const segments: { text: string; style: any }[] = [];
      let currentIndex = 0;

      // Keywords
      const keywords = /\b(const|let|var|function|return|if|else|for|while|class|extends|import|export|from|async|await|try|catch|throw|new|this|super|static|constructor|get|set|typeof|instanceof)\b/g;

      // Strings
      const strings = /(["'`])(?:(?=(\\?))\2.)*?\1/g;

      // Comments
      const comments = /\/\/.*$/g;

      // Numbers
      const numbers = /\b\d+\.?\d*\b/g;

      // Functions
      const functions = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;

      let processedLine = line;
      const highlights: { start: number; end: number; style: any }[] = [];

      // Find all matches
      let match;

      // Comments (highest priority)
      while ((match = comments.exec(line)) !== null) {
        highlights.push({
          start: match.index,
          end: match.index + match[0].length,
          style: styles.comment
        });
      }

      // Strings
      strings.lastIndex = 0;
      while ((match = strings.exec(line)) !== null) {
        highlights.push({
          start: match.index,
          end: match.index + match[0].length,
          style: styles.string
        });
      }

      // Keywords
      keywords.lastIndex = 0;
      while ((match = keywords.exec(line)) !== null) {
        const overlaps = highlights.some(h =>
          (match!.index >= h.start && match!.index < h.end) ||
          (match!.index + match![0].length > h.start && match!.index + match![0].length <= h.end)
        );
        if (!overlaps) {
          highlights.push({
            start: match.index,
            end: match.index + match[0].length,
            style: styles.keyword
          });
        }
      }

      // Numbers
      numbers.lastIndex = 0;
      while ((match = numbers.exec(line)) !== null) {
        const overlaps = highlights.some(h =>
          (match!.index >= h.start && match!.index < h.end)
        );
        if (!overlaps) {
          highlights.push({
            start: match.index,
            end: match.index + match[0].length,
            style: styles.number
          });
        }
      }

      // Sort highlights by start position
      highlights.sort((a, b) => a.start - b.start);

      // Build segments
      let lastEnd = 0;
      highlights.forEach(highlight => {
        if (highlight.start > lastEnd) {
          segments.push({
            text: line.substring(lastEnd, highlight.start),
            style: styles.plain
          });
        }
        segments.push({
          text: line.substring(highlight.start, highlight.end),
          style: highlight.style
        });
        lastEnd = highlight.end;
      });

      if (lastEnd < line.length) {
        segments.push({
          text: line.substring(lastEnd),
          style: styles.plain
        });
      }

      if (segments.length === 0) {
        segments.push({ text: line || ' ', style: styles.plain });
      }

      return (
        <View key={lineIndex} style={styles.line}>
          <Text style={styles.lineNumber}>{(lineIndex + 1).toString().padStart(2, ' ')}</Text>
          <Text style={styles.lineContent}>
            {segments.map((segment, i) => (
              <Text key={i} style={segment.style}>
                {segment.text}
              </Text>
            ))}
          </Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerDots}>
          <View style={[styles.dot, styles.dotRed]} />
          <View style={[styles.dot, styles.dotYellow]} />
          <View style={[styles.dot, styles.dotGreen]} />
        </View>
        <Text style={styles.headerText}>{language}</Text>
      </View>
      <ScrollView
        style={styles.outerScrollView}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={styles.innerScrollView}
          nestedScrollEnabled={true}
        >
          <View style={styles.codeContent}>
            {highlightCode(code)}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerDots: {
    flexDirection: 'row',
    marginRight: theme.spacing.md,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  dotRed: {
    backgroundColor: '#ff5f56',
  },
  dotYellow: {
    backgroundColor: '#ffbd2e',
  },
  dotGreen: {
    backgroundColor: '#27c93f',
  },
  headerText: {
    color: '#888',
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
  },
  outerScrollView: {
    maxHeight: 400,
  },
  innerScrollView: {
    flexGrow: 0,
  },
  codeContent: {
    padding: theme.spacing.md,
  },
  line: {
    flexDirection: 'row',
    minHeight: 20,
    marginBottom: 2,
  },
  lineNumber: {
    color: '#858585',
    fontSize: 13,
    fontFamily: 'Courier New',
    marginRight: theme.spacing.md,
    minWidth: 30,
    textAlign: 'right',
  },
  lineContent: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Courier New',
    lineHeight: 20,
  },
  plain: {
    color: '#d4d4d4',
  },
  keyword: {
    color: '#569cd6',
    fontWeight: '600',
  },
  string: {
    color: '#ce9178',
  },
  comment: {
    color: '#6a9955',
    fontStyle: 'italic',
  },
  number: {
    color: '#b5cea8',
  },
  function: {
    color: '#dcdcaa',
  },
});
