import React, { useRef } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useThemeColor } from '@/hooks/use-theme-color';

/**
 * Example component demonstrating react-native-pager-view from Callstack
 * Features:
 * - Swipe left/right to navigate between pages
 * - Programmatic navigation with buttons
 * - Page change callbacks
 */
export function ExamplePager() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = React.useState(0);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handlePageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const goToPage = (page: number) => {
    pagerRef.current?.setPage(page);
  };

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        <View key="1" style={[styles.page, { backgroundColor: tintColor }]}>
          <Text style={[styles.pageText, { color: '#fff' }]}>First Page</Text>
          <Text style={[styles.pageSubtext, { color: '#fff' }]}>Swipe to navigate</Text>
        </View>

        <View key="2" style={[styles.page, { backgroundColor }]}>
          <Text style={[styles.pageText, { color: textColor }]}>Second Page</Text>
          <Text style={[styles.pageSubtext, { color: textColor }]}>
            Current: {currentPage + 1} / 3
          </Text>
        </View>

        <View key="3" style={[styles.page, { backgroundColor: tintColor }]}>
          <Text style={[styles.pageText, { color: '#fff' }]}>Third Page</Text>
          <Text style={[styles.pageSubtext, { color: '#fff' }]}>End of pages</Text>
        </View>
      </PagerView>

      {/* Navigation Controls */}
      <View style={styles.controls}>
        <Button title="← Prev" onPress={() => goToPage(Math.max(0, currentPage - 1))} />
        <Text style={{ color: textColor, marginHorizontal: 20 }}>Page {currentPage + 1} / 3</Text>
        <Button title="Next →" onPress={() => goToPage(Math.min(2, currentPage + 1))} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pageText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pageSubtext: {
    fontSize: 16,
    opacity: 0.8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
